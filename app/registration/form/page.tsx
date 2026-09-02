'use client';
import React, { useState, useRef, Suspense } from 'react';

export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { Upload, CheckCircle, Copy, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { submitRegistration } from '@/lib/googleSheet';

const UPI_ID = '4063202604130001@cbin';
const UPI_NAME = 'IAPSMGC CON 2026';

const WORKSHOPS = [
    "Capturing Digital Public Health Through the Lens: Practical Photography, Videography and Drone Imaging for Community Medicine.",
    "Essential Public Health Updates for Viksit Bharat by 2047.",
    "MEDPRENEUR 2026: From White Coat to Startup.",
    "Smart SRMA: Hands-on Systematic Review and Meta-analysis using AI tools.",
    "From Research Idea to Thesis Submission—Digitally, Efficiently, ethically.",
    "Transforming Competency-Based Medical Education through Digital Media–Based Innovative Teaching–Learning Approaches for Gender-Sensitive Medical Education.",
    "Decoding Human Experiences: From Voices to Evidence: A Practical Workshop on Qualitative Research in Public Health."
];

const INSTITUTIONS = [
    "Ananya College of Medicine & Research, Kalol, Gandhinagar",
    "All India Institute of Medical Sciences and Research(AIIMS) Rajkot",
    "Baroda Medical Collage",
    "B J Medical College, Ahmedabad",
    "Banas Medical College and Research Institute, Palanpur, Banaskantha",
    "Bhagyoday Medical College, Kadi, Mehsana",
    "CU Shah Medical College, Surendranagar",
    "Dr. Kiran C.Patel Medical College and Research Institute, Bharuch",
    "Dr. M.K. Shah Medical College & Research Centre, Ahmedabad",
    "Dr. N.D. Desai Faculty of Medical Science and Research, Nadiad",
    "ESIC Medical Collage & Hospital, Naroda-Bapunagar, Ahmedabad",
    "GCS Medical College, Ahmedabad",
    "GMERS Medical College, Dharpur, Patan",
    "GMERS Medical College, Gandhinagar",
    "GMERS Medical College, Godhra, Panchmahal",
    "GMERS Medical College, Gotri, Vadodara",
    "GMERS Medical College, Himmatnagar, Sabarkantha",
    "GMERS Medical College, Junagadh",
    "GMERS Medical College, Morbi",
    "GMERS Medical College, Navsari",
    "GMERS Medical College, Porbandar",
    "GMERS Medical College, Rajpipla, Narmada",
    "GMERS Medical College, Sola, Ahmedabad",
    "GMERS Medical College, Vadnagar, Mehsana",
    "GMERS Medical College, Valsad",
    "Government Medical College, Bhavnagar",
    "Government Medical College, Surat",
    "Gujarat Adani Institute of Medical Sciences, Bhuj, Kutch",
    "Kiran Medical College, Surat",
    "Matushri Prabhaben Khodabhai Boghara Medical College & Research Centre, Atkot, Rajkot",
    "Medical College, Baroda",
    "MP Shah Medical College, Jamnagar",
    "NAMO Medical Education & Research Institute, Silvassa, Dadra & Nagar Haveli, Daman and Diu",
    "Narendra Modi Medical College, Maninagar, Ahmedabad",
    "Nootan Medical College and Research Centre, Visnagar, Mehsana",
    "Pandit Deendayal Upadhyay Medical College, Rajkot",
    "Parul Institute of Medical Sciences & Research, Vadodara",
    "Pramukhswami Medical College, Karmsad, Anand",
    "SAL Institute of Medical Sciences, Ahmedabad",
    "Sardar Patel Medical College And Research Centre, Nava Naroda, Ahmedabad",
    "SBKS Medical Inst. & Research Centre, Waghodia, Vadodara",
    "Shantabaa Medical College, Amreli",
    "Shri Satsangi Medical and Research Institute, Vadasma, Mehsana",
    "Smt. N.H.L.Municipal Medical College, Ahmedabad",
    "Surat Municipal Institute of Medical Education & Research(SMIMER), Surat",
    "Swaminarayan Institute of Medical Sciences & Research, Kalol, Gandhinagar",
    "Zydus Medical College & Hospital, Dahod"
];

function RegistrationFormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const amount = parseInt(searchParams.get('amount') || '0');
    const label = searchParams.get('label') || 'Conference Registration';
    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    
    // Use explicit type=preconf param (reliable) OR label string match (fallback for old links)
    const isPreConf = type === 'preconf' || label.toLowerCase().includes('pre-conference');

    const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('IAPSMGC CON 2026 - ' + label)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiString)}&bgcolor=ffffff&color=0b1c35&margin=12`;

    const [copied, setCopied] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [proofPreview, setProofPreview] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [proofUrl, setProofUrl] = useState<string | null>(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [uploadingProof, setUploadingProof] = useState(false);
    const [photoCopied, setPhotoCopied] = useState(false);
    const [proofCopied, setProofCopied] = useState(false);
    const photoRef = useRef<HTMLInputElement>(null);
    const proofRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        fullName: '',
        gender: '',
        department: '',
        designation: '',
        participantCategory: category || '',
        institution: '',
        email: '',
        mobile: '',
        iapsmMember: '',
        iapsmRegNumber: '',
        foodPreference: '',
        rrnNumber: '',
        dateOfPayment: '',
        workshopPriorities: ['', '', '', '', '', '', ''] // 7 priorities
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [institutionSelect, setInstitutionSelect] = useState('');

    const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

    const toggleCheckbox = (key: string, val: string) => {
        setForm(f => {
            const arr = f[key as keyof typeof f] as string[];
            return {
                ...f,
                [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
            };
        });
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { setErrors(e => ({ ...e, photo: 'File too large. Max 10 MB.' })); return; }
        setErrors(e => { const n = { ...e }; delete n.photo; return n; });
        const reader = new FileReader();
        reader.onload = ev => setPhotoPreview(ev.target?.result as string);
        reader.readAsDataURL(file);

        setUploadingPhoto(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) setPhotoUrl(data.url);
            else setErrors(e => ({ ...e, photo: data.error || 'Upload failed' }));
        } catch (err) {
            setErrors(e => ({ ...e, photo: 'Upload failed' }));
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleProofChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { setErrors(e => ({ ...e, proof: 'File too large. Max 10 MB.' })); return; }
        setErrors(e => { const n = { ...e }; delete n.proof; return n; });
        const reader = new FileReader();
        reader.onload = ev => setProofPreview(ev.target?.result as string);
        reader.readAsDataURL(file);

        setUploadingProof(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) setProofUrl(data.url);
            else setErrors(e => ({ ...e, proof: data.error || 'Upload failed' }));
        } catch (err) {
            setErrors(e => ({ ...e, proof: 'Upload failed' }));
        } finally {
            setUploadingProof(false);
        }
    };

    const copyToClipboard = (text: string, setCopiedState: (v: boolean) => void) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedState(true);
                setTimeout(() => setCopiedState(false), 2000);
            }).catch(() => fallbackCopyTextToClipboard(text, setCopiedState));
        } else {
            fallbackCopyTextToClipboard(text, setCopiedState);
        }
    };

    const fallbackCopyTextToClipboard = (text: string, setCopiedState: (v: boolean) => void) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    const copyUpiId = () => copyToClipboard(UPI_ID, setCopied);
    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.fullName.trim()) e.fullName = 'Required';
        if (!form.gender) e.gender = 'Please select your gender';
        if (!form.department.trim()) e.department = 'Required';
        if (!form.designation.trim()) e.designation = 'Required';
        if (!form.participantCategory) e.participantCategory = 'Required';
        if (!photoPreview) e.photo = 'Please upload your passport size photo';
        if (!form.institution.trim()) e.institution = 'Required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!form.mobile.trim() || !/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Valid 10-digit mobile required';
        if (!form.iapsmMember) e.iapsmMember = 'Required';
        if (!form.iapsmRegNumber.trim()) e.iapsmRegNumber = 'Required';
        if (!form.foodPreference) e.foodPreference = 'Required';
        
        if (amount > 0) {
            if (!form.rrnNumber.trim()) e.rrnNumber = 'Required';
            if (!form.dateOfPayment) e.dateOfPayment = 'Required';
            if (!proofPreview) e.proof = 'Please upload your payment proof';
        } else {
            if (!proofPreview) e.proof = 'Please upload your age proof';
        }
        
        if (isPreConf) {
            const hasEmpty = form.workshopPriorities.some(p => !p);
            if (hasEmpty) {
                e.workshopPriorities = 'Please select a workshop for all 7 priorities';
            } else {
                const unique = new Set(form.workshopPriorities);
                if (unique.size !== form.workshopPriorities.length) {
                    e.workshopPriorities = 'Please select a different workshop for each priority. Duplicate priorities are not allowed.';
                }
            }
        }
        
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            document.querySelector('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSubmitting(true);
        
        try {
            const passportPhotoUrl = typeof window !== 'undefined' && photoUrl?.startsWith('/') ? window.location.origin + photoUrl : photoUrl;
            const paymentProofUrl = typeof window !== 'undefined' && proofUrl?.startsWith('/') ? window.location.origin + proofUrl : proofUrl;

            const payload = {
                amount: amount,
                fullName: form.fullName,
                gender: form.gender,
                department: form.department,
                designation: form.designation,
                category: form.participantCategory,
                passportPhoto: passportPhotoUrl,
                institution: form.institution,
                email: form.email,
                phone: form.mobile,
                iapsmMembership: form.iapsmMember,
                registrationNumber: form.iapsmRegNumber,
                foodPreference: form.foodPreference,
                registrationDoneFor: isPreConf ? 'Pre-conference Workshop' : 'Conference',
                registrationPlan: `${category} - ${label} - ₹${amount}`,
                rrn: amount === 0 ? (form.rrnNumber.trim() || 'AGE PROOF VERIFICATION') : form.rrnNumber,
                paymentDate: amount === 0 ? (form.dateOfPayment || new Date().toISOString().split('T')[0]) : form.dateOfPayment,
                paymentProof: paymentProofUrl,
                ageProof: amount === 0 ? paymentProofUrl : '',
                priority1: isPreConf ? form.workshopPriorities[0] : '',
                priority2: isPreConf ? form.workshopPriorities[1] : '',
                priority3: isPreConf ? form.workshopPriorities[2] : '',
                priority4: isPreConf ? form.workshopPriorities[3] : '',
                priority5: isPreConf ? form.workshopPriorities[4] : '',
                priority6: isPreConf ? form.workshopPriorities[5] : '',
                priority7: isPreConf ? form.workshopPriorities[6] : '',
                workshopPriorities: isPreConf ? form.workshopPriorities.map((p, i) => `Priority ${i + 1}: ${p}`).join('\n') : ''
            };
            
            await submitRegistration(payload);
            
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit registration. Please try again or check your internet connection.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Styles ─────────────────────────────────────── */
    const s = {
        page: { background: '#0B1C35', minHeight: '100vh', color: 'white' } as React.CSSProperties,
        hero: { textAlign: 'center' as const, paddingTop: '9rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderBottom: '1px solid rgba(250,204,21,0.1)' },
        heroTag: { color: '#FACC15', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.75rem', textTransform: 'uppercase' as const, marginBottom: '0.75rem', display: 'block' },
        heroTitle: { fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '0.5rem' },
        heroSub: { color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' },
        wrap: { maxWidth: '760px', margin: '0 auto', padding: '3rem 1.5rem 5rem' },
        // Amount chip
        amountChip: {
            background: 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(250,204,21,0.05))',
            border: '1px solid rgba(250,204,21,0.3)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap' as const,
            gap: '0.5rem',
        },
        // Section header
        sectionHead: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', marginTop: '2.5rem' },
        sectionDot: { width: '4px', height: '28px', background: '#FACC15', borderRadius: '2px', flexShrink: 0 },
        sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: 'white', letterSpacing: '0.04em', textTransform: 'uppercase' as const },
        // Field
        field: { marginBottom: '1.5rem' },
        label: { display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.02em' },
        required: { color: '#FACC15', marginLeft: '3px' },
        input: {
            width: '100%',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box' as const,
        },
        inputErr: { border: '1px solid #ef4444' },
        errMsg: { color: '#ef4444', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' },
        // Radio / checkbox grid
        optionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.65rem' },
        option: (selected: boolean): React.CSSProperties => ({
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.7rem 1rem',
            borderRadius: '10px',
            border: `1px solid ${selected ? '#FACC15' : 'rgba(255,255,255,0.1)'}`,
            background: selected ? 'rgba(250,204,21,0.12)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            transition: 'all 0.18s',
            userSelect: 'none',
            fontSize: '0.88rem',
            color: selected ? '#FACC15' : '#cbd5e1',
            fontWeight: selected ? 700 : 500,
        }),
        radioCircle: (selected: boolean): React.CSSProperties => ({
            width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${selected ? '#FACC15' : '#475569'}`,
            background: selected ? '#FACC15' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }),
        checkBox: (selected: boolean): React.CSSProperties => ({
            width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
            border: `2px solid ${selected ? '#FACC15' : '#475569'}`,
            background: selected ? '#FACC15' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }),
        // File upload
        fileZone: (hasFile: boolean): React.CSSProperties => ({
            border: `2px dashed ${hasFile ? '#FACC15' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: hasFile ? 'rgba(250,204,21,0.05)' : 'rgba(255,255,255,0.02)',
        }),
        // Submit button
        submitBtn: {
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #FACC15, #d4af37)',
            color: '#0B1C35',
            fontWeight: 800,
            fontSize: '1.05rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            transition: 'all 0.2s',
        } as React.CSSProperties,
    };

    // ── Success Screen ──────────────────────────────
    if (submitted) {
        return (
            <main style={s.page}>
                <Header variant="solid" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <CheckCircle size={40} color="#22c55e" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>Registration Submitted!</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Thank you for registering for <strong style={{ color: 'white' }}>IAPSMGC CON 2026</strong>. Your registration is under review. You will receive a confirmation email shortly.
                    </p>
                    <button onClick={() => router.push('/')} style={{ padding: '0.85rem 2.5rem', borderRadius: '10px', border: '2px solid #FACC15', background: 'transparent', color: '#FACC15', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
                        Back to Home
                    </button>
                </div>
                <Footer />
            </main>
        );
    }

    // ── Main Form ───────────────────────────────────
    return (
        <main style={s.page}>
            <Header variant="solid" />

            {/* Hero */}
            <div style={s.hero}>
                <span style={s.heroTag}>IAPSMGC CON 2026</span>
                <h1 style={s.heroTitle}>Registration Form</h1>
                <p style={s.heroSub}>Fill in all required fields. Your information will be used for certificate printing and conference communication.</p>
            </div>

            <div style={s.wrap}>
                {/* Selected plan chip */}
                <div style={s.amountChip}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Selected Plan</p>
                        <p style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{label}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.1rem' }}>Amount</p>
                        <p style={{ color: '#FACC15', fontWeight: 900, fontSize: '1.75rem', lineHeight: 1 }}>{amount === 0 ? 'FREE (₹0)' : `₹${amount}`}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* ── Section 1: Personal Info ── */}
                    <div style={s.sectionHead}><div style={s.sectionDot} /><span style={s.sectionTitle}>Personal Information</span></div>

                    {/* 1. Full Name */}
                    <div style={s.field}>
                        <label style={s.label}>Full Name <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(As you want it printed on certificate)</span></label>
                        <input
                            style={{ ...s.input, ...(errors.fullName ? s.inputErr : {}) }}
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={e => set('fullName', e.target.value)}
                            data-error={errors.fullName ? true : undefined}
                        />
                        {errors.fullName && <p style={s.errMsg}><AlertCircle size={13} />{errors.fullName}</p>}
                    </div>

                    {/* 2. Gender */}
                    <div style={s.field}>
                        <label style={s.label}>Gender <span style={s.required}>*</span></label>
                        <div style={{ ...s.optionGrid, gridTemplateColumns: 'repeat(2, 1fr)', ...(errors.gender ? { outline: '1px solid #ef4444', borderRadius: '10px', padding: '4px' } : {}) }} data-error={errors.gender ? true : undefined}>
                            {['Male', 'Female'].map(g => (
                                <div key={g} style={s.option(form.gender === g)} onClick={() => set('gender', g)}>
                                    <div style={s.radioCircle(form.gender === g)}>
                                        {form.gender === g && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0B1C35' }} />}
                                    </div>
                                    {g}
                                </div>
                            ))}
                        </div>
                        {errors.gender && <p style={s.errMsg}><AlertCircle size={13} />{errors.gender}</p>}
                    </div>

                    {/* 3. Department */}
                    <div style={s.field}>
                        <label style={s.label}>Department / Specialty <span style={s.required}>*</span></label>
                        <input
                            style={{ ...s.input, ...(errors.department ? s.inputErr : {}) }}
                            placeholder="e.g. Community Medicine, Public Health"
                            value={form.department}
                            onChange={e => set('department', e.target.value)}
                            data-error={errors.department ? true : undefined}
                        />
                        {errors.department && <p style={s.errMsg}><AlertCircle size={13} />{errors.department}</p>}
                    </div>

                    {/* 4. Designation */}
                    <div style={s.field}>
                        <label style={s.label}>Designation <span style={s.required}>*</span></label>
                        <input
                            style={{ ...s.input, ...(errors.designation ? s.inputErr : {}) }}
                            placeholder="e.g. Professor, Assistant Professor, Resident"
                            value={form.designation}
                            onChange={e => set('designation', e.target.value)}
                            data-error={errors.designation ? true : undefined}
                        />
                        {errors.designation && <p style={s.errMsg}><AlertCircle size={13} />{errors.designation}</p>}
                    </div>

                    {/* 5. Category */}
                    <div style={s.field}>
                        <label style={s.label}>Category <span style={s.required}>*</span></label>
                        <div style={s.optionGrid} data-error={errors.participantCategory ? true : undefined}>
                            {['Post Graduate Student', 'Senior Resident', 'Faculty', 'Co Delegate', 'Intern', 'Under Graduate Student'].map(c => (
                                <div key={c} style={s.option(form.participantCategory === c)} onClick={() => set('participantCategory', c)}>
                                    <div style={s.radioCircle(form.participantCategory === c)}>
                                        {form.participantCategory === c && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0B1C35' }} />}
                                    </div>
                                    {c}
                                </div>
                            ))}
                        </div>
                        {errors.participantCategory && <p style={s.errMsg}><AlertCircle size={13} />{errors.participantCategory}</p>}
                    </div>

                    {/* 6. Passport Photo */}
                    <div style={s.field}>
                        <label style={s.label}>Upload Passport Size Photo <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(PDF/Image, Max 10 MB)</span></label>
                        <div
                            style={s.fileZone(!!photoPreview)}
                            onClick={() => photoRef.current?.click()}
                            data-error={errors.photo ? true : undefined}
                        >
                            <input ref={photoRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handlePhotoChange} />
                            {photoPreview ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={photoPreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #FACC15' }} />
                                    <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ Photo uploaded. Click to change.</span>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <Upload size={28} color="#FACC15" />
                                    <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Click to upload passport photo</span>
                                    <span style={{ color: '#475569', fontSize: '0.78rem' }}>JPG, PNG or PDF · Max 10 MB</span>
                                </div>
                            )}
                            {uploadingPhoto && (
                                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#FACC15', fontSize: '0.85rem' }}>
                                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...
                                </div>
                            )}
                        </div>
                        {photoUrl && (
                            <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ flex: 1, fontSize: '0.85rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {typeof window !== 'undefined' ? window.location.origin + photoUrl : photoUrl}
                                </span>
                                <button type="button" onClick={() => {
                                    const urlToCopy = typeof window !== 'undefined' ? window.location.origin + photoUrl : photoUrl;
                                    copyToClipboard(urlToCopy || '', setPhotoCopied);
                                }} style={{ background: photoCopied ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.12)', border: `1px solid ${photoCopied ? 'rgba(34,197,94,0.4)' : 'rgba(250,204,21,0.3)'}`, borderRadius: '6px', padding: '0.35rem 0.65rem', cursor: 'pointer', color: photoCopied ? '#22c55e' : '#FACC15', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
                                    {photoCopied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                    {photoCopied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        )}
                        {errors.photo && <p style={s.errMsg}><AlertCircle size={13} />{errors.photo}</p>}
                    </div>

                    {/* ── Section 2: Contact & Institution ── */}
                    <div style={s.sectionHead}><div style={s.sectionDot} /><span style={s.sectionTitle}>Contact & Institution</span></div>

                    {/* 7. Institution */}
                    <div style={s.field}>
                        <label style={s.label}>Institution / Organization Name <span style={s.required}>*</span></label>
                        <select
                            style={{ ...s.input, ...(errors.institution ? s.inputErr : {}), appearance: 'auto' }}
                            value={institutionSelect}
                            onChange={e => {
                                setInstitutionSelect(e.target.value);
                                if (e.target.value !== 'Other') {
                                    set('institution', e.target.value);
                                } else {
                                    set('institution', '');
                                }
                            }}
                            data-error={errors.institution ? true : undefined}
                        >
                            <option value="" disabled>Select Institution / Organization</option>
                            {INSTITUTIONS.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                            <option value="Other">Other</option>
                        </select>
                        {institutionSelect === 'Other' && (
                            <input
                                style={{ ...s.input, marginTop: '0.75rem', ...(errors.institution ? s.inputErr : {}) }}
                                placeholder="Please specify your institution"
                                value={form.institution}
                                onChange={e => set('institution', e.target.value)}
                            />
                        )}
                        {errors.institution && <p style={s.errMsg}><AlertCircle size={13} />{errors.institution}</p>}
                    </div>

                    {/* 8. Email */}
                    <div style={s.field}>
                        <label style={s.label}>Email Address <span style={s.required}>*</span></label>
                        <input
                            type="email"
                            style={{ ...s.input, ...(errors.email ? s.inputErr : {}) }}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={e => set('email', e.target.value)}
                        />
                        {errors.email && <p style={s.errMsg}><AlertCircle size={13} />{errors.email}</p>}
                    </div>

                    {/* 9. Mobile */}
                    <div style={s.field}>
                        <label style={s.label}>Mobile / WhatsApp Number <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(Active WhatsApp for conference communication)</span></label>
                        <input
                            type="tel"
                            style={{ ...s.input, ...(errors.mobile ? s.inputErr : {}) }}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            value={form.mobile}
                            onChange={e => set('mobile', e.target.value.replace(/\D/g, ''))}
                        />
                        {errors.mobile && <p style={s.errMsg}><AlertCircle size={13} />{errors.mobile}</p>}
                    </div>

                    {/* ── Section 3: Membership ── */}
                    <div style={s.sectionHead}><div style={s.sectionDot} /><span style={s.sectionTitle}>IAPSM Membership</span></div>

                    {/* 10. IAPSM Member */}
                    <div style={s.field}>
                        <label style={s.label}>IAPSM Membership <span style={s.required}>*</span></label>
                        <div style={{ ...s.optionGrid, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {['Yes', 'No'].map(v => (
                                <div key={v} style={s.option(form.iapsmMember === v)} onClick={() => {
                                    setForm(f => ({
                                        ...f,
                                        iapsmMember: v,
                                        iapsmRegNumber: v === 'No' ? 'NA' : (f.iapsmRegNumber === 'NA' ? '' : f.iapsmRegNumber)
                                    }));
                                }}>
                                    <div style={s.radioCircle(form.iapsmMember === v)}>
                                        {form.iapsmMember === v && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0B1C35' }} />}
                                    </div>
                                    {v}
                                </div>
                            ))}
                        </div>
                        {errors.iapsmMember && <p style={s.errMsg}><AlertCircle size={13} />{errors.iapsmMember}</p>}
                    </div>

                    {/* 11. IAPSM Reg No */}
                    <div style={s.field}>
                        <label style={s.label}>IAPSM Registration Number <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}></span></label>
                        <input
                            style={{ 
                                ...s.input, 
                                ...(errors.iapsmRegNumber ? s.inputErr : {}),
                                ...(form.iapsmMember === 'No' ? { opacity: 0.6, cursor: 'not-allowed', backgroundColor: 'rgba(255,255,255,0.02)' } : {})
                            }}
                            placeholder="e.g. IAPSM-12345 or NA"
                            value={form.iapsmRegNumber}
                            onChange={e => set('iapsmRegNumber', e.target.value)}
                            readOnly={form.iapsmMember === 'No'}
                        />
                        {errors.iapsmRegNumber && <p style={s.errMsg}><AlertCircle size={13} />{errors.iapsmRegNumber}</p>}
                    </div>

                    {/* ── Section 4: Preferences ── */}
                    <div style={s.sectionHead}><div style={s.sectionDot} /><span style={s.sectionTitle}>Preferences</span></div>

                    {/* 12. Food */}
                    <div style={s.field}>
                        <label style={s.label}>Food Preference <span style={s.required}>*</span></label>
                        <div style={{ ...s.optionGrid, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {['Regular', 'Jain'].map(f => (
                                <div key={f} style={s.option(form.foodPreference === f)} onClick={() => set('foodPreference', f)}>
                                    <div style={s.radioCircle(form.foodPreference === f)}>
                                        {form.foodPreference === f && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0B1C35' }} />}
                                    </div>
                                    {f}
                                </div>
                            ))}
                        </div>
                        {errors.foodPreference && <p style={s.errMsg}><AlertCircle size={13} />{errors.foodPreference}</p>}
                    </div>

                    {/* ── Section 5: Workshop Preferences ── */}
                    {isPreConf && (
                        <>
                            <div style={s.sectionHead}><div style={s.sectionDot} /><span style={s.sectionTitle}>Workshop Preferences</span></div>
                            <div style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                                    Please select your preferred workshops in order of priority (Priority 1 being your most preferred). You must rank all 7 workshops and each workshop can only be selected once.
                                </p>
                                
                                {form.workshopPriorities.map((priority, index) => (
                                    <div key={index} style={s.field}>
                                        <label style={s.label}>Priority {index + 1} Preference <span style={s.required}>*</span></label>
                                        <select
                                            style={{ ...s.input, ...(errors.workshopPriorities ? s.inputErr : {}), appearance: 'auto', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            value={form.workshopPriorities[index]}
                                            onChange={(e) => {
                                                const newPriorities = [...form.workshopPriorities];
                                                newPriorities[index] = e.target.value;
                                                set('workshopPriorities', newPriorities as any);
                                            }}
                                            data-error={errors.workshopPriorities ? true : undefined}
                                        >
                                            <option value="" disabled>Select a workshop</option>
                                            {WORKSHOPS.map((workshop, wIndex) => (
                                                <option key={wIndex} value={workshop} disabled={form.workshopPriorities.includes(workshop) && form.workshopPriorities[index] !== workshop}>
                                                    {workshop}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                                {errors.workshopPriorities && <p style={s.errMsg}><AlertCircle size={13} />{errors.workshopPriorities}</p>}
                            </div>
                        </>
                    )}

                    {/* ── Section 6: Payment Details OR Age Details ── */}
                    <div style={s.sectionHead}>
                        <div style={s.sectionDot} />
                        <span style={s.sectionTitle}>{amount === 0 ? 'Age Details' : 'Payment Details'}</span>
                    </div>

                    {amount > 0 ? (
                        <>
                            {/* 14. RRN */}
                            <div style={s.field}>
                                <label style={s.label}>RRN Number <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(Enter the correct RRN Number after successful payment)</span></label>
                                <input
                                    style={{ ...s.input, ...(errors.rrnNumber ? s.inputErr : {}) }}
                                    placeholder="Enter RRN / Transaction Reference Number"
                                    value={form.rrnNumber}
                                    onChange={e => set('rrnNumber', e.target.value)}
                                />
                                {errors.rrnNumber && <p style={s.errMsg}><AlertCircle size={13} />{errors.rrnNumber}</p>}
                            </div>

                            {/* 15. Date of Payment */}
                            <div style={s.field}>
                                <label style={s.label}>Date of Payment <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(DD/MM/YYYY format)</span></label>
                                <input
                                    type="date"
                                    style={{ ...s.input, ...(errors.dateOfPayment ? s.inputErr : {}), colorScheme: 'dark' }}
                                    value={form.dateOfPayment}
                                    onChange={e => set('dateOfPayment', e.target.value)}
                                />
                                {errors.dateOfPayment && <p style={s.errMsg}><AlertCircle size={13} />{errors.dateOfPayment}</p>}
                            </div>

                            {/* ── QR Code Block (between Q15 and Q16) ── */}
                            <div style={{
                                background: 'linear-gradient(145deg, rgba(15,28,55,0.9) 0%, rgba(10,18,38,1) 100%)',
                                border: '1px solid rgba(250,204,21,0.25)',
                                borderRadius: '18px',
                                overflow: 'hidden',
                                marginBottom: '1.75rem',
                            }}>
                                <div style={{ height: '4px', background: 'linear-gradient(90deg, #FACC15, #d4af37, #FACC15)' }} />
                                <div style={{ padding: '1.75rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {/* QR */}
                                    <div style={{ background: 'white', borderRadius: '14px', padding: '0.85rem', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={qrUrl} alt={`UPI QR ₹${amount}`} width={180} height={180} style={{ display: 'block', borderRadius: '6px' }} />
                                        <p style={{ color: '#0b1c35', fontSize: '0.65rem', fontWeight: 800, textAlign: 'center', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Scan to Pay ₹{amount}
                                        </p>
                                    </div>
                                    {/* Instructions */}
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>Pay ₹{amount} via UPI</p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1.1rem', lineHeight: 1.6 }}>
                                            Scan the QR code with <strong style={{ color: '#cbd5e1' }}>GPay, PhonePe, Paytm or BHIM</strong>, or pay directly to the UPI ID below.
                                        </p>
                                        {/* UPI ID row */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.6rem 0.85rem', marginBottom: '1rem' }}>
                                            <span style={{ flex: 1, color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>{UPI_ID}</span>
                                            <button type="button" onClick={copyUpiId} style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.12)', border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(250,204,21,0.3)'}`, borderRadius: '6px', padding: '0.35rem 0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: copied ? '#22c55e' : '#FACC15', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' as const }}>
                                                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <div style={{ background: 'rgba(250,204,21,0.07)', border: '1px solid rgba(250,204,21,0.15)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                                            <p style={{ color: '#fde68a', fontSize: '0.78rem', lineHeight: 1.6 }}>
                                                ⚠️ After payment, note your <strong>RRN/Transaction ID</strong> and upload the payment screenshot below.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 16. Upload Payment Proof */}
                            <div style={s.field}>
                                <label style={s.label}>Upload Payment Proof <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(PDF/JPG only, Max 10 MB)</span></label>
                                <div
                                    style={s.fileZone(!!proofPreview)}
                                    onClick={() => proofRef.current?.click()}
                                    data-error={errors.proof ? true : undefined}
                                >
                                    <input ref={proofRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handleProofChange} />
                                    {proofPreview ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={proofPreview} alt="Payment proof" style={{ height: '90px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', border: '2px solid #FACC15' }} />
                                            <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ Payment proof uploaded. Click to change.</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <Upload size={28} color="#FACC15" />
                                            <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Click to upload payment screenshot or PDF</span>
                                            <span style={{ color: '#475569', fontSize: '0.78rem' }}>JPG, PNG or PDF · Max 10 MB</span>
                                        </div>
                                    )}
                                    {uploadingProof && (
                                        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#FACC15', fontSize: '0.85rem' }}>
                                            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...
                                        </div>
                                    )}
                                </div>
                                {proofUrl && (
                                    <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ flex: 1, fontSize: '0.85rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {typeof window !== 'undefined' ? window.location.origin + proofUrl : proofUrl}
                                        </span>
                                        <button type="button" onClick={() => {
                                            const urlToCopy = typeof window !== 'undefined' ? window.location.origin + proofUrl : proofUrl;
                                            copyToClipboard(urlToCopy || '', setProofCopied);
                                        }} style={{ background: proofCopied ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.12)', border: `1px solid ${proofCopied ? 'rgba(34,197,94,0.4)' : 'rgba(250,204,21,0.3)'}`, borderRadius: '6px', padding: '0.35rem 0.65rem', cursor: 'pointer', color: proofCopied ? '#22c55e' : '#FACC15', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
                                            {proofCopied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                            {proofCopied ? 'Copied!' : 'Copy Link'}
                                        </button>
                                    </div>
                                )}
                                {errors.proof && <p style={s.errMsg}><AlertCircle size={13} />{errors.proof}</p>}
                            </div>
                        </>
                    ) : (
                        /* When amount === 0 (100% discount applied): Show ONLY Upload Age Proof */
                        <div style={s.field}>
                            <label style={s.label}>Upload Age Proof <span style={s.required}>*</span> <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.8rem' }}>(Govt ID / Passport / Driving License / Birth Certificate - PDF/JPG only, Max 10 MB)</span></label>
                            <div
                                style={s.fileZone(!!proofPreview)}
                                onClick={() => proofRef.current?.click()}
                                data-error={errors.proof ? true : undefined}
                            >
                                <input ref={proofRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handleProofChange} />
                                {proofPreview ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={proofPreview} alt="Age proof" style={{ height: '90px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', border: '2px solid #FACC15' }} />
                                        <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ Age proof uploaded. Click to change.</span>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <Upload size={28} color="#FACC15" />
                                        <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Click to upload Age Proof document</span>
                                        <span style={{ color: '#475569', fontSize: '0.78rem' }}>JPG, PNG or PDF · Max 10 MB</span>
                                    </div>
                                )}
                                {uploadingProof && (
                                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#FACC15', fontSize: '0.85rem' }}>
                                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...
                                    </div>
                                )}
                            </div>
                            {proofUrl && (
                                <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ flex: 1, fontSize: '0.85rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {typeof window !== 'undefined' ? window.location.origin + proofUrl : proofUrl}
                                    </span>
                                    <button type="button" onClick={() => {
                                        const urlToCopy = typeof window !== 'undefined' ? window.location.origin + proofUrl : proofUrl;
                                        copyToClipboard(urlToCopy || '', setProofCopied);
                                    }} style={{ background: proofCopied ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.12)', border: `1px solid ${proofCopied ? 'rgba(34,197,94,0.4)' : 'rgba(250,204,21,0.3)'}`, borderRadius: '6px', padding: '0.35rem 0.65rem', cursor: 'pointer', color: proofCopied ? '#22c55e' : '#FACC15', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
                                        {proofCopied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                        {proofCopied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>
                            )}
                            {errors.proof && <p style={s.errMsg}><AlertCircle size={13} />{errors.proof}</p>}
                        </div>
                    )}

                    {/* Validation summary */}
                    {Object.keys(errors).length > 0 && (
                        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                            <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ color: '#fca5a5', fontSize: '0.88rem', lineHeight: 1.6 }}>
                                Please fix the errors above before submitting.
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" style={s.submitBtn} disabled={submitting}>
                        {submitting ? <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Submitting…</> : <>Submit Registration <ChevronRight size={20} /></>}
                    </button>
                </form>
            </div>

            <Footer />

            <style>{`
                input::placeholder { color: #475569; }
                input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
                select option { background-color: #0B1C35; color: white; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </main>
    );
}

export default function RegistrationFormPage() {
    return (
        <Suspense fallback={
            <main style={{ background: '#0B1C35', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={40} color="#FACC15" style={{ animation: 'spin 1s linear infinite' }} />
            </main>
        }>
            <RegistrationFormContent />
        </Suspense>
    );
}
