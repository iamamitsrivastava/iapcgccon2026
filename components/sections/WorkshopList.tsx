"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Clock, User, Users, CheckCircle } from 'lucide-react';

const workshopsData = [
  {
    id: 1,
    title: "1. Capturing Digital Public Health Through the Lens: Practical Photography, Videography and Drone Imaging for Community Medicine",
    proposer: "Dr. Nanda Kumar J., Senior Resident, Government Medical College, Bhavnagar & Dr. Mohit N. Makwana, Assistant Professor, Department of Community Oncology GCRI, Ahmedabad",
    otherFaculties: "-",
    duration: "8 Hours",
  },
  {
    id: 2,
    title: "2. Essential Public Health Updates for Viksit Bharat by 2047",
    proposer: "Dr. Bhaveshbhai R. Bariya, Assistant Professor, Medical College Baroda, Vadodara",
    otherFaculties: "Resource Person 2: Dr. Neha A. Patel (Associate Professor, Community Medicine GMERS Medical College Valsad, Gujarat) | Resource Person 3: Dr. Darshankumar Mahyavanshi (Professor and Head, Community Medicine NAMO Medical Education and Research Institute, Silvassa) | Resource Person 4: Dr. Nilamkumar J. Patel (Professor, Community Medicine Nootan Medical College & Research Centre, Sankalchand Patel University, Visnagar)",
    duration: "6 Hours",
  },
  {
    id: 3,
    title: "3. MEDPRENEUR 2026: From White Coat to Startup",
    proposer: "Dr. Bharti Koria, Associate Professor, Pandit Deendayal Upadhyay Medical College, Rajkot",
    otherFaculties: "-",
    duration: "8 Hours",
  },
  {
    id: 4,
    title: "4. Smart SRMA: Hands-on Systematic Review and Meta-analysis using AI tools",
    proposer: "Dr. Ankit Sheth, Medical Scientist 'F' and Head (Health Sciences Division) ICMR - National Institute of Occupational Health Research",
    otherFaculties: "Resource person 2: Dr. Ankit Viramgami (Scientist 'D' ICMR – National Institute of Occupational Health Research, Ahmedabad) | Resource person 3: Dr. Bhavesh Modi (Director and Scientist 'G' ICMR – National Institute of Occupational Health Research, Ahmedabad) | Resource person 4: Dr. Urvish Joshi (Associate Professor, Dept. of Community Medicine Narendra Modi Medical College, Ahmedabad)",
    duration: "4 Hours",
  },
  {
    id: 5,
    title: "5. From Research Idea to Thesis Submission—Digitally, Efficiently, ethically",
    proposer: "Dr Krupal Joshi, Head of Department and Additional Professor AIIMS Rajkot",
    otherFaculties: "Resource Person 2: Dr Anjali Modi (Associate Professor AIIMS Rajkot) | Resource Person 3: Dr Shailee Vyas (Assistant Professor Government medical College)",
    duration: "8 Hours",
  },
  {
    id: 6,
    title: "6. Transforming Competency-Based Medical Education through Digital Media–Based Innovative Teaching–Learning Approaches for Gender-Sensitive Medical Education",
    proposer: "Dr Manisha Gohel, Professor & Head Pramukhswami Medical College, Bhaikaka University, Karamsad",
    otherFaculties: "Resource Person 2: Dr Dinesh Kumar (Professor Community Medicine Pramukhswami Medical College, Bhaikaka University, Karamsad)",
    duration: "3 Hours",
  }
];

export default function WorkshopList() {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="workshops-list-container" style={{ marginTop: '2rem' }}>
      <style>{`
        .workshop-btn-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 768px) {
          .workshop-btn-container {
            justify-content: center;
          }
        }
      `}</style>
      {workshopsData.map((workshop) => (
        <div 
          key={workshop.id} 
          style={{
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div 
            onClick={() => toggleOpen(workshop.id)}
            style={{
              padding: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: openId === workshop.id ? '#f8fafc' : '#fff',
              borderBottom: openId === workshop.id ? '1px solid #e2e8f0' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ paddingRight: '1rem' }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '700', 
                color: '#0F172A', 
                marginBottom: '0.5rem',
                lineHeight: '1.4'
              }}>
                {workshop.title}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.2rem 0.6rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  color: '#b08d20',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  <Clock size={14} />
                  {workshop.duration}
                </span>
              </div>
            </div>
            <div>
              {openId === workshop.id ? <ChevronUp size={20} color="#D4AF37" /> : <ChevronDown size={20} color="#64748b" />}
            </div>
          </div>
          
          {openId === workshop.id && (
            <div style={{ padding: '1.5rem', background: '#fff' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={16} /> Proposer
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: '#334155', fontWeight: '500' }}>
                    {workshop.proposer}
                  </p>
                </div>
                
                {workshop.otherFaculties !== "-" && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Users size={16} /> Other Resource Faculties
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {workshop.otherFaculties.split(' | ').map((faculty, idx) => (
                        <li key={idx} style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle size={14} color="#D4AF37" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                          <span>{faculty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="workshop-btn-container">
                  <button 
                    onClick={() => router.push('/registration')}
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #aa8c2c 100%)',
                      color: '#0a1124',
                      border: 'none',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(212,175,55,0.25)',
                      transition: 'transform 0.2s'
                    }}>
                    Register & Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
