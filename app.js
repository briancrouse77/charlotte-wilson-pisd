document.addEventListener('DOMContentLoaded', () => {
  
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
        alert('Please enter a valid 5-digit ZIP code to check registration details.');
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

  // Step 3: Add to calendar simulation
  if (btnAddReminder) {
    btnAddReminder.addEventListener('click', () => {
      const method = voteMethod.value;
      let eventTitle = "Vote for Charlotte Wilson (Princeton ISD)";
      let dateString = "November 5, 2026";
      let location = "Princeton High School Polling Site";
      
      if (method === 'early') {
        dateString = "October 26, 2026 (Early Voting)";
        location = "Princeton City Hall";
      } else if (method === 'mail') {
        dateString = "Mail-In Ballot deadline (October 25)";
        location = "Princeton ISD Administration Office / Mail";
      }

      alert(`Calendar Event Created!\n\nEvent: ${eventTitle}\nDate: ${dateString}\nLocation: ${location}\n\nThank you for making a plan to support student success!`);
      
      btnAddReminder.innerText = 'Reminder Added ✓';
      btnAddReminder.style.backgroundColor = '#4CAF50';
      btnAddReminder.style.color = '#FFFFFF';
      voteMethod.setAttribute('disabled', 'true');
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
      explanation: 'This proposal directly improves Special Education services, catches learning issues early in Pre-K, and supports classroom educators. Charlotte will 100% support early screening.',
      color: '#4CAF50'
    },
    admin: {
      checks: [false, false, false, false, false],
      decision: 'REJECT',
      explanation: 'School board funds must go to classroom outcomes. Hiring more central administrative office layers does not improve student literacy, math, or direct teacher support. Charlotte rejects administration growth that bypasses schools.',
      color: '#F44336'
    },
    tech: {
      checks: [true, true, true, true, true],
      decision: 'SUPPORT',
      explanation: 'Preparing students for an AI-driven workforce and integrating modern technology directly into lessons helps them learn and gives teachers better tools. Charlotte supports this.',
      color: '#4CAF50'
    },
    renovate: {
      checks: [false, false, false, false, false],
      decision: 'REJECT',
      explanation: 'Charlotte believes school board expenditures belong in classrooms, not boardrooms. Spending taxpayer money on luxury boardroom renovations or furniture does not help students learn. Charlotte will vote NO.',
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

    // Initial render
    renderTable();
  }

});

