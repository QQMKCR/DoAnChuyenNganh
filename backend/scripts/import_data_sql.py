import re
import os
import sys
import sqlite3
# Ensure backend root is on sys.path so `app` package is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.database import DB_PATH, _get_conn

SQL_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'data.sql'))

def unquote(s):
    s = s.strip()
    if s.upper() == 'NULL':
        return None
    # remove leading N for NVARCHAR literals like N'Name'
    if s.startswith("N'") or s.startswith("n'"):
        s = s[2:]
    if s.startswith("'") and s.endswith("'"):
        # Unescape single quotes
        inner = s[1:-1].replace("''", "'")
        return inner
    # numeric
    try:
        if '.' in s:
            return float(s)
        return int(s)
    except Exception:
        return s


def parse_insert_values(values_block):
    # values_block contains e.g. (1, 2, 'a'),(3,4,'b') or with newlines
    tuples = []
    # normalize
    vb = values_block.strip()
    # Remove starting VALUES if present
    if vb.upper().startswith('VALUES'):
        vb = vb[6:]
    # We need to split by '),(' but keep parentheses balanced for safety
    parts = []
    cur = ''
    depth = 0
    i=0
    while i < len(vb):
        ch = vb[i]
        cur += ch
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
            if depth == 0:
                parts.append(cur.strip())
                cur = ''
                # skip comma and spaces after )
                j = i+1
                while j < len(vb) and vb[j] in ', \n\r\t':
                    j += 1
                i = j-1
        i += 1
    for p in parts:
        # p like '(1, 2, ''text'')'
        inner = p.strip()[1:-1]
        # split by commas but ignoring commas inside quotes
        vals = []
        cur = ''
        in_quote = False
        qchar = ""
        j=0
        while j < len(inner):
            c = inner[j]
            if c in "\"'":
                if not in_quote:
                    in_quote = True
                    qchar = c
                    cur += c
                else:
                    # may be escaped by doubling
                    if j+1 < len(inner) and inner[j+1] == c:
                        cur += c+c
                        j += 1
                    elif c == qchar:
                        in_quote = False
                        cur += c
                    else:
                        cur += c
            elif c == ',' and not in_quote:
                vals.append(cur.strip())
                cur = ''
            else:
                cur += c
            j += 1
        if cur != '':
            vals.append(cur.strip())
        tuples.append([unquote(v) for v in vals])
    return tuples


def import_data():
    conn = _get_conn()
    cur = conn.cursor()

    inserted = {'users':0,'patients':0,'records':0}

    # Helper to process SQL content (may contain multiple GO-separated blocks)
    def process_content(content):
        blocks = re.split(r"\nGO\s*\n", content, flags=re.IGNORECASE)
        for blk in blocks:
            blk = blk.strip()
            if not blk:
                continue
            m = re.search(r"INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*(.+);", blk, flags=re.IGNORECASE | re.DOTALL)
            if not m:
                continue
            table = m.group(1)
            cols = [c.strip() for c in m.group(2).split(',')]
            values_block = m.group(3)
            tuples = parse_insert_values(values_block)
            # For each tuple, build insert into sqlite
            for t in tuples:
                # map columns to values
                row = dict(zip(cols, t))
                if table.lower() == 'users':
                    # email, password_hash, full_name, role, phone
                    email = row.get('email')
                    password = row.get('password_hash')
                    full_name = row.get('full_name')
                    role = row.get('role')
                    phone = row.get('phone')
                    cur.execute('INSERT OR IGNORE INTO users (email, password_hash, full_name, role, phone, created_at) VALUES (?, ?, ?, ?, ?, ?)',
                                (email, password, full_name, role, phone, datetime_now()))
                    inserted['users'] += 1
                elif table.lower() == 'patients':
                    # columns include citizen_id, full_name, gender, date_of_birth, phone, address, created_by
                    citizen_id = row.get('citizen_id')
                    name = row.get('full_name') or row.get('name')
                    phone = row.get('phone')
                    dob = row.get('date_of_birth')
                    gender = row.get('gender')
                    address = row.get('address')
                    province = row.get('province')
                    condition = row.get('condition')
                    created_by = row.get('created_by')
                    # store address in medical_history field
                    cur.execute('INSERT INTO patients (citizen_id, name, gender, date_of_birth, phone, address, province, condition, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                (citizen_id, name, gender, dob, phone, address, province, condition, created_by, datetime_now()))
                    inserted['patients'] += 1
                elif table.lower() == 'heartrecords':
                    # two variants: with or without recorded_at
                    # columns: patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target, recorded_by [, recorded_at]
                    patient_id = row.get('patient_id')
                    age = row.get('age')
                    sex = row.get('sex')
                    cp = row.get('cp')
                    trestbps = row.get('trestbps')
                    chol = row.get('chol')
                    fbs = row.get('fbs')
                    restecg = row.get('restecg')
                    thalach = row.get('thalach')
                    exang = row.get('exang')
                    oldpeak = row.get('oldpeak')
                    slope = row.get('slope')
                    ca = row.get('ca')
                    thal = row.get('thal')
                    target = row.get('target')
                    recorded_by = row.get('recorded_by')
                    recorded_at = row.get('recorded_at') if 'recorded_at' in row else None

                    if recorded_at:
                        cur.execute('''INSERT INTO predictions (patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, prediction_date)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                                    (patient_id, age, sex_to_int(sex), cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target, recorded_at))
                    else:
                        cur.execute('''INSERT INTO predictions (patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, prediction_date)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                                    (patient_id, age, sex_to_int(sex), cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target, datetime_now()))
                    inserted['records'] += 1

    # First import main data.sql if present
    if os.path.exists(SQL_FILE):
        print('Reading', SQL_FILE)
        with open(SQL_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        process_content(content)

    # Then import any SQL files under backend/data/
    data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data'))
    if os.path.isdir(data_dir):
        for fname in os.listdir(data_dir):
            if not fname.lower().endswith('.sql'):
                continue
            path = os.path.join(data_dir, fname)
            print('Reading', path)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            # If this is the assistant-generated insert_heart_records.sql with a marker,
            # generate additional synthetic rows to reach 300 records total.
            if 'Following entries are synthetic to reach 300 rows' in content:
                # count existing tuples in the first INSERT in the file
                m = re.search(r"INSERT\s+INTO\s+HeartRecords\s*\(([^)]+)\)\s*VALUES\s*(.+);", content, flags=re.IGNORECASE | re.DOTALL)
                existing = 0
                if m:
                    vals_block = m.group(2)
                    parts = parse_insert_values(vals_block)
                    existing = len(parts)
                needed = max(0, 300 - existing)
                if needed > 0:
                    # generate `needed` synthetic tuples
                    import random
                    from datetime import datetime, timedelta
                    start_date = datetime(2025, 11, 1, 8, 0, 0)
                    tuples = []
                    for i in range(needed):
                        pid = (i % 5) + 1
                        age = random.randint(30, 80)
                        sex = "'Nam'" if random.random() < 0.6 else "'Nữ'"
                        cp = random.randint(0,3)
                        trestbps = random.randint(100,160)
                        chol = random.randint(150,320)
                        fbs = random.choice([0,0,1])
                        restecg = random.randint(0,2)
                        thalach = random.randint(90,190)
                        exang = random.choice([0,1])
                        oldpeak = round(random.uniform(0,4),1)
                        slope = random.randint(0,2)
                        ca = random.randint(0,3)
                        thal = random.randint(0,3)
                        target = random.choice([0,0,1])
                        recorded_by = 2
                        dt = start_date + timedelta(days=i)
                        recorded_at = dt.strftime("'%Y-%m-%d %H:%M:%S'")
                        tup = f"({pid}, {age}, {sex}, {cp}, {trestbps}, {chol}, {fbs}, {restecg}, {thalach}, {exang}, {oldpeak}, {slope}, {ca}, {thal}, {target}, {recorded_by}, {recorded_at})"
                        tuples.append(tup)
                    # append generated tuples to the existing INSERT statement before the final semicolon
                    content = content.rstrip().rstrip(';') + ',\n' + ',\n'.join(tuples) + ';\n'

            process_content(content)

    conn.commit()
    conn.close()
    print('Inserted:', inserted)


def datetime_now():
    from datetime import datetime
    return datetime.now().isoformat()


def sex_to_int(sex):
    # map 'Nam'/'Nữ' to 1/0 or keep as provided; predictions table sex column defined as integer earlier
    if sex is None:
        return None
    s = str(sex).strip().lower()
    if s in ("nam", "male", "Male"):
        return 1
    if s in ("nữ", "nu", "female", "Female"):
        return 0
    try:
        return int(sex)
    except Exception:
        return sex

if __name__ == '__main__':
    import sys
    try:
        import_data()
    except Exception as e:
        print('Error importing data.sql:', e)
        sys.exit(1)
    print('Done')
