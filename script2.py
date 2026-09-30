import os
import re

header_path = r'd:\IPASMGCON Website\iapcgccon2026\components\sections\Header.tsx'
with open(header_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("    { label: 'Call for Papers', href: '/call-for-papers' },\n", "")
content = content.replace("    { label: 'Call for Papers', href: '/call-for-papers' },", "")

new_sci = '''    {
        label: 'Scientific',
        href: '/resources/publishing-ethics',
        children: [
            { label: 'Scientific Program', href: '/program' },
            { label: 'Submission Guidlines', href: '/resources/publishing-ethics' },
            { label: 'Call for Papers', href: '/call-for-papers' },
            { label: 'Submit Abstract', href: '#submit-abstract' },
        ]
    },'''

content = re.sub(r"    \{\s*label: 'Scientific'[\s\S]*?\]\s*\},", new_sci, content)

with open(header_path, 'w', encoding='utf-8') as f:
    f.write(content)
