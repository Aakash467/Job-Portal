import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';

export default function Jobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/applications/my-applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppliedJobs(res.data.applications || []);
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div style={{ 
      padding: '2rem 1rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem',
          fontWeight: 600,
          color: '#0f172a',
          margin: '0 0 2rem 0',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          My Applications
        </h2>

        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Loading your applications...
          </div>
        ) : appliedJobs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            No applications found. Start applying to see your jobs here.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {appliedJobs.map(application => (
              <div 
                key={application._id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {application.job.title}
                    </h3>
                    <p style={{ 
                      color: '#64748b',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {application.job.company?.name || 'N/A'}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: 
                      application.status === 'accepted' ? '#dcfce7' :
                      application.status === 'rejected' ? '#fee2e2' : '#e0f2fe',
                    color: 
                      application.status === 'accepted' ? '#166534' :
                      application.status === 'rejected' ? '#991b1b' : '#075985',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}>
                    {application.status}
                  </span>
                </div>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#475569'
                }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Location:</span> {application.job.location}
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Type:</span> {application.job.jobType}
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Applied:</span> {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
