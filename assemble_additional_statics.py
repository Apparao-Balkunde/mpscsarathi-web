# -*- coding: utf-8 -*-
import json
import random
import re
from add_stats_1 import batch1
from add_stats_2 import batch2
from add_static_gk import batch3

all_new = batch1 + batch2 + batch3
print(f"Total new questions: {len(all_new)}")

marathi_digits = {0: "१", 1: "२", 2: "३", 3: "४"}

# Deterministic seed for reproducible balanced option placement
rng = random.Random(20261114)

fixed = []
for idx, q in enumerate(all_new):
    opts = list(q["options"])
    assert len(opts) == 4, f"Expected 4 options for {q['id']}"
    correct_text = opts[q["correctIndex"]]
    
    # Check if any option says "यापैकी सर्व" / "वरील सर्व" / "एकही नाही" / "दोन्ही"
    order_sensitive = any(
        kw in o for o in opts for kw in ["वरील सर्व", "यापैकी सर्व", "एकही नाही", "दोन्हीसाठी", "दोन्हीही", "दोन्हीमध्ये"]
    )
    
    if not order_sensitive:
        # Pick target index roughly balanced across 0,1,2,3
        target_idx = (idx + rng.randint(0, 3)) % 4
        other_opts = [o for i, o in enumerate(opts) if i != q["correctIndex"]]
        rng.shuffle(other_opts)
        new_opts = []
        other_iter = iter(other_opts)
        for pos in range(4):
            if pos == target_idx:
                new_opts.append(correct_text)
            else:
                new_opts.append(next(other_iter))
        q["options"] = new_opts
        q["correctIndex"] = target_idx
        
        # Update explanation prefix "योग्य उत्तर पर्याय १" -> marathi_digits[target_idx]
        exp = q["explanation"]
        new_digit = marathi_digits[target_idx]
        exp = re.sub(r"योग्य उत्तर पर्याय [१२३४]", f"योग्य उत्तर पर्याय {new_digit}", exp, count=1)
        q["explanation"] = exp
    
    fixed.append(q)

# Verify distribution of correctIndex
dist = {0: 0, 1: 0, 2: 0, 3: 0}
for q in fixed:
    dist[q["correctIndex"]] += 1
    # Verify explanation matches correctIndex if it contains "योग्य उत्तर पर्याय"
    m = re.search(r"योग्य उत्तर पर्याय ([१२३४])", q["explanation"])
    assert m, f"Missing marker in {q['id']}"
    assert m.group(1) == marathi_digits[q["correctIndex"]], f"Mismatch in {q['id']}: {m.group(1)} vs {q['correctIndex']}"

print("CorrectIndex distribution:", dist)

ts_content = """// Additional Statistics (DES / MPSC) & High-Yield Static GK MCQs
import { McqQuestion } from './mcqData';

export const ADDITIONAL_STATICS_QUESTIONS: McqQuestion[] = """ + json.dumps(fixed, ensure_ascii=False, indent=2) + ";\n"

with open("src/data/additionalStatisticsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Wrote src/data/additionalStatisticsData.ts successfully.")
