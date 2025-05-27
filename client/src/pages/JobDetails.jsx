import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URL from '../utils/api';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/jobs/getjob/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJob(res.data.job);
      } catch (err) {
        console.error('Error fetching job:', err);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/applications/apply/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 201) {
        setApplied(true);
      }
    } catch (err) {
      console.error("Error applying for job:", err);
    }
  };

  if (!job) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem', 
      color: '#64748b',
      fontFamily: "'Inter', sans-serif"
    }}>
      Loading job details...
    </div>
  );

  return (
    <div style={{ 
      padding: '3rem 1rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      color: '#1e293b'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        padding: '2.5rem'
      }}>
        {/* Header Section */}
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: 600,
            margin: '0 0 0.5rem 0',
            color: '#0f172a'
          }}>
            {job.title}
          </h1>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748b',
            fontSize: '1.125rem'
          }}>
            <span>{job.company?.name}</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span>{job.location}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 0.5rem' }}>Position</h3>
            <p style={{ margin: 0, fontWeight: 500 }}>{job.position}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 0.5rem' }}>Job Type</h3>
            <p style={{ margin: 0, fontWeight: 500 }}>{job.jobType}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 0.5rem' }}>Experience</h3>
            <p style={{ margin: 0, fontWeight: 500 }}>{job.experience}</p>
          </div>
        </div>

        {/* Description */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1.5rem' }}>Job Description</h2>
          <p style={{ 
            lineHeight: 1.6,
            color: '#475569',
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
            {job.description}
          </p>
        </section>

        {/* Requirements */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1.5rem' }}>Requirements</h2>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {job.requirements.map((req, index) => (
              <span key={index} style={{
                backgroundColor: '#f1f5f9',
                color: '#334155',
                padding: '0.375rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}>
                {req}
              </span>
            ))}
          </div>
        </section>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={applied}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: applied ? '#cbd5e1' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: applied ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            ':hover': {
              backgroundColor: applied ? '#cbd5e1' : '#2563eb'
            }
          }}
        >
          {applied ? 'Application Submitted ✓' : 'Apply for this Position'}
        </button>
      </div>
    </div>
  );
}
