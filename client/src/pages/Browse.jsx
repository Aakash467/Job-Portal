import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';

export default function Browse() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [requirementFilter, setRequirementFilter] = useState('');

  useEffect(() => {
    const fetchLatestJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/jobs/getalljobs`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/jobs/getalljobs?keywords=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    (positionFilter ? job.position === positionFilter : true) &&
    (jobTypeFilter ? job.jobType === jobTypeFilter : true) &&
    (locationFilter ? job.location === locationFilter : true) &&
    (experienceFilter ? job.experience === experienceFilter : true) &&
    (requirementFilter ? job.requirements.includes(requirementFilter) : true)
  );

  const filterStateMap = {
    'Position': [positionFilter, setPositionFilter],
    'Job Type': [jobTypeFilter, setJobTypeFilter],
    'Location': [locationFilter, setLocationFilter],
    'Experience': [experienceFilter, setExperienceFilter],
    'Requirements': [requirementFilter, setRequirementFilter]
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f8fafc'
    }}>
      {/* Filters Sidebar */}
      <aside style={{ 
        width: '280px', 
        padding: '2rem 1.5rem',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ 
          margin: '0 0 2rem 0',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#1e293b'
        }}>Filters</h3>

        {['Position', 'Job Type', 'Location', 'Experience', 'Requirements'].map((filter) => {
          const [value, setValue] = filterStateMap[filter];
          return (
          <div key={filter} style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: '#64748b',
              fontWeight: 500
            }}>{filter}</label>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: 'white',
                fontSize: '0.875rem',
                color: '#1e293b',
                appearance: 'none',
                transition: 'all 0.2s',
                ':hover': {
                  borderColor: '#94a3b8'
                }
              }}
            >
              <option value="">All {filter}</option>
              {(() => {
                switch(filter) {
                  case 'Position':
                    return ['Software Engineer', 'Backend Engineer', 'Product Designer', 
                            'Data Scientist', 'Business Analyst', 'Project Manager', 
                            'Intern', 'Full Stack Developer', 'Frontend Developer', 
                            'DevOps Engineer'].map(opt => <option key={opt} value={opt}>{opt}</option>);
                  case 'Job Type':
                    return ['Full-time', 'Part-time', 'Internship'].map(opt => <option key={opt} value={opt}>{opt}</option>);
                  case 'Location':
                    return ['Remote', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad'].map(opt => <option key={opt} value={opt}>{opt}</option>);
                  case 'Experience':
                    return ['Fresher', '1-3 years', '3-5 years', '5+ years'].map(opt => <option key={opt} value={opt}>{opt}</option>);
                  case 'Requirements':
                    return ['React', 'HTML', 'CSS', 'Node.js', 'MongoDB', 'Python', 
                            'Figma', 'JavaScript', 'Docker', 'Kubernetes', 'AWS', 
                            'Git', 'SQL', 'Excel'].map(opt => <option key={opt} value={opt}>{opt}</option>);
                }
              })()}
            </select>
          </div>
          )
        })}
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '3rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            marginBottom: '2.5rem'
          }}>
            <input
              type="text"
              placeholder="Search job titles or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1,
                padding: '0.875rem 1.25rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#1e293b',
                transition: 'all 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#94a3b8',
                  boxShadow: '0 0 0 3px rgba(148, 163, 184, 0.1)'
                }
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#2563eb'
                }
              }}
            >
              Search
            </button>
          </div>

          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#64748b'
            }}>
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#64748b'
            }}>
              No jobs found matching your criteria
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {filteredJobs.map(job => (
                <div 
                  key={job.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <h3 style={{ 
                    margin: '0 0 1rem 0',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1e293b'
                  }}>
                    {job.title}
                  </h3>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    color: '#475569'
                  }} onClick={() => window.location.href = `/jobdetails/${job._id}`}>
                    <div><strong>Position:</strong> {job.position}</div>
                    <div><strong>Company:</strong> {job.company?.name}</div>
                    <div><strong>Location:</strong> {job.location}</div>
                    <div><strong>Type:</strong> {job.jobType}</div>
                    <div><strong>Experience:</strong> {job.experience}</div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong>Requirements:</strong> {job.requirements.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}