import React from 'react';

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
