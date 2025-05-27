import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import API_URL from '../utils/api.js';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ 
      padding: '3rem 1rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          clipPath: 'circle(70% at 100% 0)'
        }}></div>

        {/* Profile Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          position: 'relative'
        }}>
          {user?.profile?.profilePicture && (
            <div style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: '1.5rem',
              borderRadius: '50%',
              padding: '4px',
              background: 'linear-gradient(45deg, #3b82f6, #6366f1)'
            }}>
              <img 
                src={`http://localhost:3000/uploads/${user.profile.profilePicture.split('/').pop()}`} 
                alt="Profile" 
                style={{ 
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid white'
                }} 
              />
            </div>
          )}
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: '#0f172a',
            letterSpacing: '-0.025em'
          }}>
            {user?.fullname}
            {user?.role && (
              <span style={{
                backgroundColor: '#e0f2fe',
                color: '#075985',
                fontSize: '0.875rem',
                padding: '0.375rem 1rem',
                borderRadius: '999px',
                marginLeft: '1rem',
                verticalAlign: 'middle',
                fontWeight: 500
              }}>
                {user.role}
              </span>
            )}
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '1.125rem',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {user?.email}
          </p>
        </div>

        {/* Personal Information */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            fontSize: '0.875rem'
          }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h2 style={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                margin: '0 0 1rem 0',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Contact Information
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <div style={{ 
                    color: '#64748b',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Phone
                  </div>
                  <div style={{ 
                    color: '#475569',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}>
                    {user?.phoneNumber || 'Not provided'}
                  </div>
                </div>
              </div>
            </div>

            {user?.profile?.bio && (
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h2 style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  margin: '0 0 1rem 0',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  About Me
                </h2>
                <div style={{ 
                  color: '#475569',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  fontSize: '1rem'
                }}>
                  {user.profile.bio}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        {user?.profile?.skills?.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h2 style={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                margin: '0 0 1.5rem 0',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Skills & Expertise
              </h2>
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {user.profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    style={{
                      backgroundColor: '#e0f2fe',
                      color: '#075985',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Resume Section */}
        {user?.profile?.resume && (
          <section>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h2 style={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                margin: '0 0 1.5rem 0',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Documents
              </h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#3b82f6',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem', height: '1.5rem', color: 'white'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <div style={{ 
                    color: '#475569',
                    fontWeight: 500,
                    marginBottom: '0.25rem'
                  }}>
                    {user.profile.resumeFileName || 'Resume.pdf'}
                  </div>
                  <a
                    href={`http://localhost:3000/uploads/${user.profile.resume.split('/').pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      ':hover': {
                        color: '#2563eb'
                      }
                    }}
                  >
                    Download CV
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}