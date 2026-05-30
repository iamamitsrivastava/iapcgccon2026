import os
import re

css_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith('.css'):
            css_files.append(os.path.join(root, file))

issues = []
for file in css_files:
    with open(file, 'r') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            line = line.strip()
            # Look for 100vw
            if '100vw' in line:
                issues.append(f"{file}:{i+1}: {line} (Potential horizontal scrollbar issue)")
            # Look for fixed widths > 300px
            match = re.search(r'width:\s*(\d+)px', line)
            if match and int(match.group(1)) > 300:
                issues.append(f"{file}:{i+1}: {line} (Fixed width might overflow on small screens)")
            # Look for fixed heights that might cause overflow
            match = re.search(r'height:\s*(\d+)px', line)
            if match and int(match.group(1)) > 500:
                issues.append(f"{file}:{i+1}: {line} (Fixed height might cause overflow)")
            # Look for missing flex-wrap in flex containers (hard to do robustly with regex but let's see)
            # Look for negative margins
            if re.search(r'margin(?:-[a-z]+)?:\s*-\d', line):
                issues.append(f"{file}:{i+1}: {line} (Negative margin might cause overflow)")
            # absolute positioning
            if 'position: absolute' in line:
                issues.append(f"{file}:{i+1}: {line} (Absolute positioning can break flow)")
            
for issue in issues:
    print(issue)
