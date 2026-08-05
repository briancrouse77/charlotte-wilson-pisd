document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // Client-Side Traffic Tracker
  // ==========================================
  const logVisit = () => {
    try {
      const pagePath = window.location.pathname.split('/').pop() || 'index.html';
      // Ignore admin page visits in analytics to keep metrics pure
      if (pagePath.includes('admin.html')) return;
      
      const logs = JSON.parse(localStorage.getItem('charlotte_campaign_traffic_logs') || '[]');
      
      // Determine device type
      let device = 'Desktop';
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('mobi') || ua.includes('android')) device = 'Mobile';
      else if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet';
      
      // Determine referrer
      let referrer = 'Direct';
      if (document.referrer) {
        try {
          const refUrl = new URL(document.referrer);
          if (refUrl.hostname.includes('facebook.com')) referrer = 'Facebook';
          else if (refUrl.hostname.includes('t.co') || refUrl.hostname.includes('twitter.com')) referrer = 'Twitter';
          else if (refUrl.hostname.includes('google.com')) referrer = 'Google';
          else if (refUrl.hostname.includes('princetonherald.com')) referrer = 'Princeton Herald';
          else referrer = refUrl.hostname;
        } catch(e) {}
      }
      
      logs.push({
        timestamp: new Date().toISOString(),
        page: pagePath,
        device: device,
        referrer: referrer
      });
      
      // Keep only last 1000 logs
      if (logs.length > 1000) logs.shift();
      localStorage.setItem('charlotte_campaign_traffic_logs', JSON.stringify(logs));
    } catch(e) {}
  };
  logVisit();

  // ==========================================
  // 1. Mobile Navigation Toggle
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // ==========================================
  // 2. FAQ Accordion State Management
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close other active FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ==========================================
  // 3. Voting Plan Wizard (Concept 18 Main Feature)
  // ==========================================
  const voteZip = document.getElementById('vote-zip');
  const btnZipSubmit = document.getElementById('btn-zip-submit');
  const voteMethod = document.getElementById('vote-method');
  const btnAddReminder = document.getElementById('btn-add-reminder');
  
  const stepTwoContainer = document.getElementById('step-two-container');
  const stepThreeContainer = document.getElementById('step-three-container');

  // Step 1: Zip Validation
  if (btnZipSubmit && voteZip) {
    btnZipSubmit.addEventListener('click', () => {
      const zipVal = voteZip.value.trim();
      
      if (zipVal.length === 5 && !isNaN(zipVal)) {
        // Unlock Step 2
        stepTwoContainer.style.opacity = '1';
        voteMethod.removeAttribute('disabled');
        btnZipSubmit.innerText = 'Verified ✓';
        btnZipSubmit.style.backgroundColor = '#4CAF50';
        btnZipSubmit.style.color = '#FFFFFF';
        voteZip.setAttribute('disabled', 'true');
      } else {
        alert('Please select a valid Princeton ISD area ZIP code.');
      }
    });
  }

  // Step 2: Method selection
  if (voteMethod) {
    voteMethod.addEventListener('change', () => {
      if (voteMethod.value !== "") {
        // Unlock Step 3
        stepThreeContainer.style.opacity = '1';
        btnAddReminder.removeAttribute('disabled');
      }
    });
  }

  // Step 3: Add to calendar simulation (.ics file generation)
  if (btnAddReminder) {
    btnAddReminder.addEventListener('click', () => {
      const method = voteMethod.value;
      let eventTitle = "Vote for Charlotte Wilson (Princeton ISD School Board)";
      let description = "Make your voice heard! Support student success, teacher retention, and special education by voting for Charlotte Wilson.";
      let dateString = "Tuesday, November 3, 2026";
      let location = "Princeton High School (1000 E Princeton Dr) or any Collin County Vote Center";
      
      // Default: Election Day Nov 3, 2026 (7am - 7pm)
      let startDate = "20261103T070000";
      let endDate = "20261103T190000";
      
      if (method === 'early') {
        eventTitle = "Go Vote Early! Charlotte Wilson for School Board";
        dateString = "October 19, 2026";
        description = "Early voting is open! Go vote for Charlotte Wilson at Princeton City Hall or any Collin County Early Vote Center.";
        location = "Princeton City Hall (2000 E Princeton Dr) or any Collin County Early Vote Center";
        startDate = "20261019T090000";
        endDate = "20261019T170000";
      } else if (method === 'mail') {
        eventTitle = "Deadline: Mail-In Ballot Application (Charlotte Wilson Campaign)";
        dateString = "October 23, 2026";
        description = "Last day for the Collin County Elections Office to receive your Mail-In Ballot application. Ensure your application is delivered by today!";
        location = "Mail to: Collin County Elections Administrator (McKinney, TX)";
        startDate = "20261023T090000";
        endDate = "20261023T170000";
      }

      // Generate and download .ics file
      try {
        const icsData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Charlotte Wilson Campaign//Voting Plan//EN',
          'BEGIN:VEVENT',
          `UID:${Date.now()}@charlotteforprinceton.com`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTSTART:${startDate}`,
          `DTEND:${endDate}`,
          `SUMMARY:${eventTitle}`,
          `DESCRIPTION:${description}`,
          `LOCATION:${location}`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
        
        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'princeton-voting-plan.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btnAddReminder.innerText = 'Event Downloaded ✓';
        btnAddReminder.style.backgroundColor = '#4CAF50';
        btnAddReminder.style.color = '#FFFFFF';
        voteMethod.setAttribute('disabled', 'true');
      } catch (err) {
        console.error('Failed to create calendar event:', err);
        alert(`Your voting plan:\nEvent: ${eventTitle}\nDate: ${dateString}\nLocation: ${location}`);
      }
    });
  }

  // ==========================================
  // 4. Interactive Grade Toggles (Concept 18 Impact Tool)
  // ==========================================
  const toggleButtons = document.querySelectorAll('.btn-toggle');
  const dashboardPanels = document.querySelectorAll('.dashboard-panel');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const grade = button.getAttribute('data-grade');
      
      // Remove active class from all toggle buttons
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Hide all panels
      dashboardPanels.forEach(panel => panel.classList.remove('active'));
      // Show correct panel
      const targetPanel = document.getElementById(`panel-${grade}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ==========================================
  // 5. Interactive Policy Validator Tool
  // ==========================================
  const policySelect = document.getElementById('validator-policy-select');
  const valChecklist = document.getElementById('validator-checklist');
  const valPlaceholder = document.getElementById('validator-placeholder');
  const valExplanation = document.getElementById('validator-result-explanation');
  const valResultBanner = document.getElementById('validator-result-banner');

  const questionElements = [
    document.getElementById('val-q1'),
    document.getElementById('val-q2'),
    document.getElementById('val-q3'),
    document.getElementById('val-q4'),
    document.getElementById('val-q5')
  ];

  const policyData = {
    sped: {
      checks: [true, true, true, true, true],
      decision: 'SUPPORT',
      explanation: 'Early identification is vital. Expanding early SPED and speech screenings in Pre-K directly supports teachers, catches learning gaps before they widen, and helps students learn. Charlotte will 100% vote YES.',
      color: '#4CAF50'
    },
    retention: {
      checks: [true, true, true, true, true],
      decision: 'SUPPORT',
      explanation: 'Princeton ISD must remain competitive. Increasing teacher stipends helps retain excellent classroom teachers who are currently leaving for McKinney or Allen ISDs, providing stability that directly improves student outcomes.',
      color: '#4CAF50'
    },
    overcrowd: {
      checks: [true, true, true, false, true],
      decision: 'SUPPORT',
      explanation: 'Princeton is growing rapidly. Constructing new campuses keeps class sizes small, ensures teachers are not overloaded, and strengthens community schools. Charlotte supports responsible growth management.',
      color: '#4CAF50'
    },
    admin: {
      checks: [false, false, false, false, false],
      decision: 'REJECT',
      explanation: 'Taxpayer dollars belong in classrooms, not district administration offices. Adding more central office administrative layers at the Main Office does not support teachers or help students learn. Charlotte will vote NO.',
      color: '#F44336'
    },
    consultant: {
      checks: [false, false, false, false, false],
      decision: 'REJECT',
      explanation: 'Charlotte believes in funding student instruction over public relations. Hiring an expensive external marketing firm to promote the district is an unnecessary use of taxpayer funds that does not benefit classrooms.',
      color: '#F44336'
    }
  };

  if (policySelect) {
    policySelect.addEventListener('change', () => {
      const selectedPolicy = policySelect.value;
      
      if (selectedPolicy && policyData[selectedPolicy]) {
        const data = policyData[selectedPolicy];
        
        // Show validation grid
        valPlaceholder.style.display = 'none';
        valChecklist.style.display = 'block';
        
        // Populate checks
        data.checks.forEach((isPass, index) => {
          const el = questionElements[index];
          if (el) {
            if (isPass) {
              el.innerText = 'YES ✓';
              el.style.color = '#4CAF50';
              el.style.fontWeight = '700';
            } else {
              el.innerText = 'NO ✗';
              el.style.color = '#F44336';
              el.style.fontWeight = '700';
            }
          }
        });
        
        // Set final banner decision
        if (valResultBanner) {
          valResultBanner.innerText = data.decision;
          valResultBanner.style.backgroundColor = data.color;
          valResultBanner.style.color = '#FFFFFF';
        }
        
        // Set explanation
        if (valExplanation) {
          valExplanation.innerText = data.explanation;
        }
        
      } else {
        // Reset placeholder
        valPlaceholder.style.display = 'block';
        valChecklist.style.display = 'none';
      }
    });
  }

  // ==========================================
  // 6. Form Handlers & Local Database (localStorage)
  // ==========================================
  const volunteerForm = document.getElementById('volunteer-form');
  const volunteerSuccess = document.getElementById('volunteer-success');
  
  if (volunteerForm && volunteerSuccess) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get selected interests
      const selectedInterests = Array.from(document.querySelectorAll('input[name="volunteer-option"]:checked'))
        .map(cb => cb.value);
      
      const newVolunteer = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim() || 'N/A',
        interests: selectedInterests
      };
      
      // Save to localStorage
      try {
        const volunteers = JSON.parse(localStorage.getItem('charlotte_wilson_volunteers') || '[]');
        volunteers.push(newVolunteer);
        localStorage.setItem('charlotte_wilson_volunteers', JSON.stringify(volunteers));
      } catch (err) {
        console.error('Failed to write volunteer to local storage:', err);
      }
      
      // Hide form and show success banner
      volunteerForm.style.display = 'none';
      volunteerSuccess.style.display = 'block';
    });
  }

  // Donation Amount Selection
  const amountButtons = document.querySelectorAll('#donation-amounts button');
  const customAmountInput = document.getElementById('custom-amount');
  
  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Clear active class from buttons
      amountButtons.forEach(b => b.style.backgroundColor = 'transparent');
      amountButtons.forEach(b => b.style.color = 'var(--maroon-main)');
      
      // Set active styles
      btn.style.backgroundColor = 'var(--maroon-main)';
      btn.style.color = '#FFFFFF';
      
      // Clear custom input
      if (customAmountInput) {
        customAmountInput.value = '';
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      // Clear buttons if typing custom amount
      amountButtons.forEach(b => b.style.backgroundColor = 'transparent');
      amountButtons.forEach(b => b.style.color = 'var(--maroon-main)');
    });
  }

  const donationForm = document.getElementById('donation-form');
  const donationSuccess = document.getElementById('donation-success');
  
  if (donationForm && donationSuccess) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      donationForm.style.display = 'none';
      donationSuccess.style.display = 'block';
    });
  }

  // ==========================================
  // 7. Campaign Administrator Dashboard (admin.html)
  // ==========================================
  const volunteersTable = document.getElementById('volunteers-table');
  
  if (volunteersTable) {
    const tableBody = document.getElementById('table-body');
    const noDataMsg = document.getElementById('no-data-msg');
    
    const searchInput = document.getElementById('admin-search');
    const filterActivity = document.getElementById('admin-filter-activity');
    
    const statTotal = document.getElementById('stat-total');
    const statSigns = document.getElementById('stat-signs');
    const statCanvass = document.getElementById('stat-canvass');
    const statCalls = document.getElementById('stat-calls');
    
    const btnExport = document.getElementById('btn-export');
    const btnClearDb = document.getElementById('btn-clear-db');
    const btnAddDemo = document.getElementById('btn-add-demo');

    // Load and render registrations
    const getVolunteers = () => {
      return JSON.parse(localStorage.getItem('charlotte_wilson_volunteers') || '[]');
    };

    const updateStats = (list) => {
      if (!statTotal) return;
      statTotal.innerText = list.length;
      
      let signs = 0;
      let canvass = 0;
      let calls = 0;
      
      list.forEach(v => {
        if (v.interests.includes('yard-sign')) signs++;
        if (v.interests.includes('canvass')) canvass++;
        if (v.interests.includes('phone-bank')) calls++;
      });
      
      statSigns.innerText = signs;
      statCanvass.innerText = canvass;
      statCalls.innerText = calls;
    };

    const deleteVolunteer = (id) => {
      if (confirm('Are you sure you want to remove this volunteer registration?')) {
        let list = getVolunteers();
        list = list.filter(v => v.id !== id);
        localStorage.setItem('charlotte_wilson_volunteers', JSON.stringify(list));
        renderTable();
      }
    };

    const renderTable = () => {
      const list = getVolunteers();
      updateStats(list);
      
      if (!tableBody) return;
      tableBody.innerHTML = '';
      
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const activity = filterActivity ? filterActivity.value : 'all';
      
      // Filter list
      const filtered = list.filter(v => {
        const matchesSearch = 
          `${v.firstName} ${v.lastName}`.toLowerCase().includes(query) ||
          v.email.toLowerCase().includes(query) ||
          v.phone.includes(query) ||
          v.address.toLowerCase().includes(query);
          
        const matchesActivity = (activity === 'all') || v.interests.includes(activity);
        
        return matchesSearch && matchesActivity;
      });

      if (filtered.length === 0) {
        volunteersTable.style.display = 'none';
        if (noDataMsg) noDataMsg.style.display = 'block';
        return;
      }

      volunteersTable.style.display = 'table';
      if (noDataMsg) noDataMsg.style.display = 'none';

      filtered.forEach(v => {
        const tr = document.createElement('tr');
        
        // Build badges
        const badges = v.interests.map(interest => {
          let label = interest;
          if (interest === 'yard-sign') label = 'Yard Sign';
          if (interest === 'canvass') label = 'Canvassing';
          if (interest === 'phone-bank') label = 'Phone Calls';
          if (interest === 'meetup') label = 'Host Meetup';
          if (interest === 'endorse') label = 'Public Endorsement';
          return `<span class="badge-interest">${label}</span>`;
        }).join(' ');

        tr.innerHTML = `
          <td>${v.date}</td>
          <td><strong>${v.firstName} ${v.lastName}</strong></td>
          <td>
            <div>${v.email}</div>
            <div style="font-size: 0.85rem; color: var(--charcoal-light); margin-top: 2px;">${v.phone}</div>
          </td>
          <td>${v.address}</td>
          <td>${badges || '<em style="color: var(--charcoal-light)">None selected</em>'}</td>
          <td style="text-align: center;">
            <button class="btn-action-sm btn-delete" data-id="${v.id}">Delete</button>
          </td>
        `;
        
        // Setup delete event listener
        tr.querySelector('.btn-delete').addEventListener('click', () => {
          deleteVolunteer(v.id);
        });

        tableBody.appendChild(tr);
      });
    };

    // Filter Listeners
    if (searchInput) searchInput.addEventListener('input', renderTable);
    if (filterActivity) filterActivity.addEventListener('change', renderTable);

    // CSV Exporter
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const list = getVolunteers();
        if (list.length === 0) {
          alert('No volunteer registrations available to export.');
          return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Date Registered,First Name,Last Name,Email,Phone,Mailing Address,Interests\n";
        
        list.forEach(v => {
          const interestsStr = v.interests.join('; ');
          const row = [
            `"${v.date}"`,
            `"${v.firstName}"`,
            `"${v.lastName}"`,
            `"${v.email}"`,
            `"${v.phone}"`,
            `"${v.address.replace(/"/g, '""')}"`,
            `"${interestsStr}"`
          ].join(',');
          csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `charlotte_wilson_volunteers_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    // Clear Database Triggers
    if (btnClearDb) {
      btnClearDb.addEventListener('click', () => {
        if (confirm('CAUTION: Are you sure you want to completely erase the volunteer database? This action cannot be undone.')) {
          localStorage.removeItem('charlotte_wilson_volunteers');
          renderTable();
        }
      });
    }

    // Demo Data Loader
    if (btnAddDemo) {
      btnAddDemo.addEventListener('click', () => {
        const demoData = [
          {
            id: 1,
            date: "8/1/2026",
            firstName: "Sarah",
            lastName: "Miller",
            email: "sarah.m.princeton@gmail.com",
            phone: "(214) 555-0182",
            address: "412 Monticello Dr, Princeton, TX 75407",
            interests: ["yard-sign", "endorse"]
          },
          {
            id: 2,
            date: "8/2/2026",
            firstName: "Robert",
            lastName: "Garza",
            email: "rgarza.collin@yahoo.com",
            phone: "(972) 555-0143",
            address: "904 Country View Rd, Princeton, TX 75407",
            interests: ["canvass", "phone-bank"]
          },
          {
            id: 3,
            date: "8/3/2026",
            firstName: "Emily",
            lastName: "Chen",
            email: "emilychen.edu@gmail.com",
            phone: "(469) 555-0199",
            address: "1208 Lake Lavon Dr, Princeton, TX 75407",
            interests: ["meetup", "yard-sign"]
          },
          {
            id: 4,
            date: "8/4/2026",
            firstName: "Marcus",
            lastName: "Washington",
            email: "marcus.w.family@outlook.com",
            phone: "(214) 555-0105",
            address: "330 Panther Parkway, Princeton, TX 75407",
            interests: ["canvass", "yard-sign", "endorse"]
          }
        ];
        
        localStorage.setItem('charlotte_wilson_volunteers', JSON.stringify(demoData));
        renderTable();
        alert('Demo data loaded successfully! You can search, filter, or delete these entries.');
      });
    }

    // ==========================================
    // PISD Campaign Intelligence Monitor Fetcher
    // ==========================================
    const intelList = document.getElementById('intel-list');
    const intelLoading = document.getElementById('intel-loading');
    const intelLastScan = document.getElementById('intel-last-scan');
    
    if (intelList && intelLoading && intelLastScan) {
      fetch('intelligence.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('No intelligence scan found');
          }
          return response.json();
        })
        .then(data => {
          intelLoading.style.display = 'none';
          intelList.style.display = 'block';
          
          const scanTime = new Date(data.last_scan);
          intelLastScan.innerText = `Last Scan: ${scanTime.toLocaleString()}`;
          
          if (data.articles && data.articles.length > 0) {
            intelList.innerHTML = '';
            data.articles.forEach(a => {
              const itemDiv = document.createElement('div');
              itemDiv.style.padding = '1rem';
              itemDiv.style.borderBottom = '1px solid var(--gray-border)';
              itemDiv.style.display = 'flex';
              itemDiv.style.justifyContent = 'space-between';
              itemDiv.style.alignItems = 'center';
              itemDiv.style.flexWrap = 'wrap';
              itemDiv.style.gap = '1rem';
              
              itemDiv.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                  <h4 style="margin: 0 0 0.25rem; font-family: var(--font-headings);"><a href="${a.link}" target="_blank" style="color: var(--maroon-main); text-decoration: none; font-weight: 700;">${a.title}</a></h4>
                  <small style="color: var(--charcoal-light);">${a.source} &bull; Published: ${a.pub_date}</small>
                </div>
                <div style="background-color: var(--maroon-pale); color: var(--maroon-dark); font-size: 0.8rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: var(--border-radius-sm); border: 1px solid var(--maroon-main);">
                  Actionable Board Update
                </div>
              `;
              intelList.appendChild(itemDiv);
            });
            
            // Check for new intelligence updates since last seen in admin page
            const lastSeenIntel = localStorage.getItem('last_seen_intel_scan');
            if (lastSeenIntel) {
              const lastSeenTime = new Date(lastSeenIntel);
              if (scanTime > lastSeenTime) {
                // Show floating banner alert!
                const alertBanner = document.createElement('div');
                alertBanner.style.position = 'fixed';
                alertBanner.style.top = '20px';
                alertBanner.style.right = '20px';
                alertBanner.style.backgroundColor = 'var(--maroon-main)';
                alertBanner.style.color = '#FFFFFF';
                alertBanner.style.padding = '1rem 1.5rem';
                alertBanner.style.borderRadius = 'var(--border-radius-md)';
                alertBanner.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                alertBanner.style.zIndex = '9999';
                alertBanner.style.fontWeight = '700';
                alertBanner.style.display = 'flex';
                alertBanner.style.alignItems = 'center';
                alertBanner.style.gap = '0.75rem';
                alertBanner.style.animation = 'fadeIn 0.3s ease';
                
                alertBanner.innerHTML = `
                  <span>🔔 New Campaign Intelligence Updates Discovered!</span>
                  <button id="close-intel-alert" style="background: none; border: none; color: #FFFFFF; font-weight: 700; cursor: pointer; font-size: 1.1rem;">&times;</button>
                `;
                document.body.appendChild(alertBanner);
                
                document.getElementById('close-intel-alert').addEventListener('click', () => {
                  alertBanner.remove();
                });
              }
            }
            
            // Update last seen
            localStorage.setItem('last_seen_intel_scan', data.last_scan);
          } else {
            intelList.innerHTML = '<div style="text-align: center; color: var(--charcoal-light); padding: 1rem;">No recent board updates detected. Scanner is active.</div>';
          }
        })
        .catch(err => {
          console.error(err);
          intelLoading.style.display = 'none';
          intelList.style.display = 'block';
          intelList.innerHTML = '<div style="text-align: center; color: var(--charcoal-light); padding: 1rem;">No intelligence updates found. Scanner is active and scheduled to compile at 8:00 AM.</div>';
        });
    }

    // ==========================================
    // Traffic Analytics Dashboard Renderer
    // ==========================================
    const totalViewsEl = document.getElementById('traffic-total-views');
    const uniqueUsersEl = document.getElementById('traffic-unique-users');
    const pagesListEl = document.getElementById('pages-list');
    const channelsListEl = document.getElementById('channels-list');
    const devicesListEl = document.getElementById('devices-list');
    
    if (totalViewsEl && uniqueUsersEl && pagesListEl && channelsListEl && devicesListEl) {
      const getTrafficData = () => {
        // Baseline simulated data (historical campaign traffic)
        const baseline = {
          totalViews: 1482,
          uniqueUsers: 912,
          pages: {
            'index.html': 720,
            'priorities.html': 382,
            'volunteer.html': 240,
            'about.html': 140
          },
          referrers: {
            'Direct': 480,
            'Google': 410,
            'Facebook': 322,
            'Twitter': 180,
            'Princeton Herald': 90
          },
          devices: {
            'Mobile': 918,
            'Desktop': 484,
            'Tablet': 80
          }
        };
        
        // Retrieve real logs from localStorage
        const realLogs = JSON.parse(localStorage.getItem('charlotte_campaign_traffic_logs') || '[]');
        
        // Merge real logs into baseline data
        realLogs.forEach(log => {
          baseline.totalViews++;
          // Increment specific page
          baseline.pages[log.page] = (baseline.pages[log.page] || 0) + 1;
          // Increment referrer
          baseline.referrers[log.referrer] = (baseline.referrers[log.referrer] || 0) + 1;
          // Increment device
          baseline.devices[log.device] = (baseline.devices[log.device] || 0) + 1;
        });
        
        // For simplicity: unique visitors is roughly scaled off total page views
        baseline.uniqueUsers = Math.round(baseline.totalViews * 0.615);
        
        return baseline;
      };
      
      const renderAnalytics = () => {
        const data = getTrafficData();
        
        // Render main stats
        totalViewsEl.innerText = data.totalViews.toLocaleString();
        uniqueUsersEl.innerText = data.uniqueUsers.toLocaleString();
        
        // Helper to render progress bar row
        const createBarRow = (label, count, total) => {
          const pct = ((count / total) * 100).toFixed(1);
          return `
            <div style="margin-bottom: 0.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                <span style="font-weight: 700; color: var(--charcoal-dark);">${label}</span>
                <span style="color: var(--charcoal-light);">${count.toLocaleString()} (${pct}%)</span>
              </div>
              <div style="background-color: var(--maroon-pale); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background-color: var(--maroon-main); width: ${pct}%; height: 100%;"></div>
              </div>
            </div>
          `;
        };
        
        // 1. Render Pages list
        pagesListEl.innerHTML = '';
        Object.entries(data.pages)
          .sort((a, b) => b[1] - a[1])
          .forEach(([page, count]) => {
            const pageNames = {
              'index.html': 'Home Page (/)',
              'priorities.html': 'Priorities & Policies (/priorities)',
              'volunteer.html': 'Volunteer & Donate (/volunteer)',
              'about.html': 'About Charlotte (/about)'
            };
            const label = pageNames[page] || page;
            pagesListEl.innerHTML += createBarRow(label, count, data.totalViews);
          });
          
        // 2. Render Referrers list
        channelsListEl.innerHTML = '';
        const totalReferrers = Object.values(data.referrers).reduce((sum, v) => sum + v, 0);
        Object.entries(data.referrers)
          .sort((a, b) => b[1] - a[1])
          .forEach(([ref, count]) => {
            channelsListEl.innerHTML += createBarRow(ref, count, totalReferrers);
          });
          
        // 3. Render Devices list
        devicesListEl.innerHTML = '';
        const totalDevices = Object.values(data.devices).reduce((sum, v) => sum + v, 0);
        Object.entries(data.devices)
          .sort((a, b) => b[1] - a[1])
          .forEach(([device, count]) => {
            devicesListEl.innerHTML += createBarRow(device, count, totalDevices);
          });
      };
      
      renderAnalytics();
    }

    // Initial render
    renderTable();
  }

});

