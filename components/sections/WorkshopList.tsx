"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Clock, User, Users, CheckCircle, ArrowRight } from 'lucide-react';

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
    otherFaculties: " Dr. Neha A. Patel (Associate Professor, Community Medicine GMERS Medical College Valsad, Gujarat) | Resource Person 3: Dr. Darshankumar Mahyavanshi (Professor and Head, Community Medicine NAMO Medical Education and Research Institute, Silvassa) | Resource Person 4: Dr. Nilamkumar J. Patel (Professor, Community Medicine Nootan Medical College & Research Centre, Sankalchand Patel University, Visnagar)",
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
    otherFaculties: " Dr. Ankit Viramgami (Scientist 'D' ICMR – National Institute of Occupational Health Research, Ahmedabad) | Resource person 3: Dr. Bhavesh Modi (Director and Scientist 'G' ICMR – National Institute of Occupational Health Research, Ahmedabad) | Resource person 4: Dr. Urvish Joshi (Associate Professor, Dept. of Community Medicine Narendra Modi Medical College, Ahmedabad)",
    duration: "4 Hours",
  },
  {
    id: 5,
    title: "5. From Research Idea to Thesis Submission—Digitally, Efficiently, ethically",
    proposer: "Dr.Chandresh Pandya ,Professor Medical College Baroda",
    otherFaculties: " Dr Anjali Modi (Associate Professor AIIMS Rajkot)",
    duration: "8 Hours",
  },
  {
    id: 6,
    title: "6. Transforming Competency-Based Medical Education through Digital Media–Based Innovative Teaching–Learning Approaches for Gender-Sensitive Medical Education",
    proposer: "Dr Manisha Gohel, Professor & Head Pramukhswami Medical College, Bhaikaka University, Karamsad",
    otherFaculties: "Dr Dinesh Kumar (Professor Community Medicine Pramukhswami Medical College, Bhaikaka University, Karamsad)",
    duration: "3 Hours",
  }
];

const parsePersonInfo = (text: string) => {
  const cleanText = text.replace(/Resource [Pp]erson \d+:\s*/g, '').trim();
  let name = cleanText;
  let affiliation = '';

  const parenMatch = cleanText.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if (parenMatch) {
    name = parenMatch[1].trim();
    affiliation = parenMatch[2].trim();
  } else {
    const commaIndex = cleanText.indexOf(',');
    if (commaIndex !== -1) {
      name = cleanText.substring(0, commaIndex).trim();
      affiliation = cleanText.substring(commaIndex + 1).trim();
    }
  }

  return { name, affiliation };
};

export default function WorkshopList() {
  const router = useRouter();

  return (
    <div className="workshops-list-container" style={{ marginTop: '2rem' }}>
      <style>{`
        .workshop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 380px;
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: left;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        /* We use hover to trigger the flip, but also allow focus for accessibility */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 2rem 1.5rem;
          background: #fff;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        .flip-card-front {
          border-top: 4px solid #D4AF37;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(to bottom right, #ffffff, #f8fafc);
        }
        .flip-card-back {
          border-top: 4px solid #0F172A;
          transform: rotateY(180deg);
          overflow-y: auto;
          background: #fafafa;
        }
        
        /* Custom scrollbar for back side */
        .flip-card-back::-webkit-scrollbar {
          width: 6px;
        }
        .flip-card-back::-webkit-scrollbar-track {
          background: transparent; 
        }
        .flip-card-back::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        
        .workshop-btn-container {
          margin-top: auto;
          padding-top: 1rem;
          display: flex;
          justify-content: center;
        }
        
        .flip-hint {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="workshop-grid">
        {workshopsData.map((workshop) => {
          return (
            <div className="flip-card" key={workshop.id}>
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front">
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#0F172A',
                      marginBottom: '1.5rem',
                      lineHeight: '1.5'
                    }}>
                      {workshop.title}
                    </h3>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1.2rem',
                      background: 'rgba(212, 175, 55, 0.1)',
                      color: '#b08d20',
                      borderRadius: '999px',
                      fontSize: '0.9rem',
                      fontWeight: '700'
                    }}>
                      <Clock size={16} />
                      {workshop.duration}
                    </span>
                  </div>
                  <div className="flip-hint">
                    Hover for details <ArrowRight size={14} />
                  </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User size={16} /> Proposer
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {workshop.proposer.split(' & ').map((proposerStr, idx) => {
                          const proposerInfo = parsePersonInfo(proposerStr);
                          return (
                            <div key={idx} style={{ flex: '1 1 100%' }}>
                              <p style={{ fontSize: '0.95rem', color: '#334155', fontWeight: '600', margin: 0 }}>
                                {proposerInfo.name}
                              </p>
                              {proposerInfo.affiliation && (
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem', marginBottom: 0 }}>
                                  {proposerInfo.affiliation}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {workshop.otherFaculties !== "-" && (
                      <div>
                        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Users size={16} /> Other Resource Faculties
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {workshop.otherFaculties.split(' | ').map((faculty, idx) => {
                            const facultyInfo = parsePersonInfo(faculty);
                            return (
                              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <CheckCircle size={14} color="#D4AF37" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                                <div>
                                  <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}>
                                    {facultyInfo.name}
                                  </div>
                                  {facultyInfo.affiliation && (
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem' }}>
                                      {facultyInfo.affiliation}
                                    </div>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

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
                        transition: 'transform 0.2s',
                        width: '100%'
                      }}>
                      Register & Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
