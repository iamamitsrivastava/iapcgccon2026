import os
import re

os.makedirs(r'd:\IPASMGCON Website\iapcgccon2026\app\call-for-papers', exist_ok=True)
page_path = r'd:\IPASMGCON Website\iapcgccon2026\app\call-for-papers\page.tsx'

page_content = '''import React from 'react';

export default function CallForPapers() {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#002060', borderBottom: '2px solid #c09040', paddingBottom: '10px', fontSize: '28px', fontWeight: 'bold' }}>Two calls, one conference</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#903020', fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Call for Papers</h2>
        <p style={{ lineHeight: '1.6', color: '#333' }}>For academics, research scholars and doctoral candidates. Abstracts are allocated to one track and reviewed double blind. Accepted papers are presented in parallel sessions and considered for publication.</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#903020', fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Call for Proposals</h2>
        <p style={{ lineHeight: '1.6', color: '#333' }}>For professional designers, artists and educators, postgraduate students and staff. Proposals may take the form of workshops, demonstrations, exhibitions, performances or posters.</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#903020', fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Submission guidelines</h2>
        <ul style={{ lineHeight: '1.6', color: '#333', paddingLeft: '20px', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '10px' }}>Abstracts of up to 250 words, with five keywords, allocated to a single track and sub theme.</li>
          <li style={{ marginBottom: '10px' }}>Abstract title limited to 20 words. Submissions in English.</li>
          <li style={{ marginBottom: '10px' }}>Full papers up to 5,000 words in the conference template, Times New Roman 12 point, references single spaced.</li>
          <li style={{ marginBottom: '10px' }}>Similarity below 10 per cent. Work must be original and not previously published or accepted elsewhere.</li>
          <li style={{ marginBottom: '10px' }}>At least one author must register for a paper to be presented and considered for publication.</li>
          <li style={{ marginBottom: '10px' }}>No change of title, abstract or authorship is permitted after the submission deadline.</li>
        </ul>
      </div>
    </div>
  );
}
'''
with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)

header_path = r'd:\IPASMGCON Website\iapcgccon2026\components\sections\Header.tsx'
with open(header_path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'/call-for-papers'" not in content:
    if "label: 'Scientific'" in content:
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
    else:
        new_item = '''    { label: 'Call for Papers', href: '/call-for-papers' },\n    { label: 'Explore Vadodara' '''
        content = content.replace("    { label: 'Explore Vadodara'", new_item)

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("All updates done.")
