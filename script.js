// Campaign data storage (using JavaScript variables instead of localStorage)
let campaignsData = [
    {
        id: 1,
        title: "ลดใช้พลาสติกแบบใช้ครั้งเดียว",
        description: "รณรงค์เพื่อลดการใช้พลาสติกแบบใช้ครั้งเดียวในชีวิตประจำวัน",
        icon: "🌱",
        supporters: 2547,
        target: 5000,
        details: {
            problem: "พลาสติกแบบใช้ครั้งเดียวเป็นปัญหาสำคัญที่ส่งผลกระทบต่อสิ่งแวดล้อม ทำให้เกิดขยะที่ย่อยสลายยากและปนเปื้อนในระบบนิเวศ",
            solution: "ส่งเสริมการใช้ภาชนะและอุปกรณ์ที่นำกลับมาใช้ใหม่ได้ ลดการพึ่งพาพลาสติกแบบใช้ครั้งเดียว",
            impact: "หากเราลดการใช้พลาสติกได้ 50% จะช่วยลดขยะพลาสติกปีละ 2.5 ล้านตัน"
        }
    },
    {
        id: 2,
        title: "โครงการอาหารเหลือทิ้งเป็นศูนย์",
        description: "ลดการทิ้งอาหารและนำไปใช้ประโยชน์ให้คุ้มค่า",
        icon: "🍚",
        supporters: 1823,
        target: 3000,
        details: {
            problem: "ประเทศไทยมีอาหารเหลือทิ้งปีละ 17 ล้านตัน ซึ่งเป็นการสูญเสียทรัพยากรและเพิ่มปัญหาขยะ",
            solution: "สร้างเครือข่ายการแบ่งปันอาหาร ส่งเสริมการทำอาหารอย่างมีแผน และการแปรรูปอาหารเหลือใช้",
            impact: "สามารถลดอาหารเหลือทิ้งได้ 30% และช่วยเหลือผู้ยากไร้ได้มากกว่า 100,000 คน"
        }
    },
    {
        id: 3,
        title: "พลังงานสะอาดเพื่อชุมชน",
        description: "ส่งเสริมการใช้พลังงานหมุนเวียนในชุมชนท้องถิ่น",
        icon: "⚡",
        supporters: 3456,
        target: 8000,
        details: {
            problem: "การพึ่งพาพลังงานฟอสซิลส่งผลให้เกิดมมลพิษทางอากาศและการเปลี่ยนแปลงสภาพภูมิอากาศ",
            solution: "ติดตั้งระบบพลังงานแสงอาทิตย์และลมในชุมชน สร้างความเป็นอิสระทางพลังงาน",
            impact: "ลดการปล่อยก๊าซเรือนกระจกได้ 40% และลดค่าไฟฟ้าของชุมชนได้ 60%"
        }
    },
    {
        id: 4,
        title: "ปกป้องป่าและสัตว์ป่า",
        description: "อนุรักษ์ระบบนิเวศและความหลากหลายทางชีวภาพ",
        icon: "🦎",
        supporters: 5234,
        target: 10000,
        details: {
            problem: "ป่าไผ่ถูกทำลายปีละ 500,000 ไร่ ส่งผลให้สัตว์ป่าสูญเสียที่อยู่อาศัยและเกิดการสูญพันธุ์",
            solution: "สร้างพื้นที่อนุรักษ์ ส่งเสริมการปลูกป่าใหม่ และสร้างจิตสำนึกในการอนุรักษ์",
            impact: "ฟื้นฟูพื้นที่ป่าได้ 1 ล้านไร่ และปกป้องสัตว์ป่าหายากมากกว่า 500 ชนิด"
        }
    }
];

// User support tracking (using JavaScript variables)
let userSupports = new Set();

// DOM elements
const campaignsGrid = document.getElementById('campaignsGrid');
const modal = document.getElementById('campaignModal');
const closeBtn = document.querySelector('.close');
const supportBtn = document.getElementById('supportBtn');
const successMessage = document.getElementById('successMessage');

// Initialize the app
function init() {
    renderCampaigns();
    setupEventListeners();
}

// Render campaign cards
function renderCampaigns() {
    campaignsGrid.innerHTML = '';
    
    campaignsData.forEach(campaign => {
        const progressPercent = Math.min((campaign.supporters / campaign.target) * 100, 100);
        
        const cardHTML = `
            <div class="campaign-card" onclick="openModal(${campaign.id})">
                <div class="campaign-image">
                    ${campaign.icon}
                </div>
                <div class="campaign-content">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <p class="campaign-description">${campaign.description}</p>
                    <div class="campaign-stats">
                        <span class="supporters-count">${campaign.supporters.toLocaleString()} คน</span>
                        <span class="campaign-target">เป้าหมาย ${campaign.target.toLocaleString()}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        campaignsGrid.innerHTML += cardHTML;
    });
}

// Open modal with campaign details
function openModal(campaignId) {
    const campaign = campaignsData.find(c => c.id === campaignId);
    if (!campaign) return;

    const progressPercent = Math.min((campaign.supporters / campaign.target) * 100, 100);
    
    document.getElementById('modalTitle').textContent = campaign.title;
    document.getElementById('modalDescription').textContent = campaign.description;
    
    const detailsHTML = `
        <div class="detail-section">
            <h4 class="detail-title">🔍 ปัญหาที่เราเผชิญ</h4>
            <p class="detail-content">${campaign.details.problem}</p>
        </div>
        <div class="detail-section">
            <h4 class="detail-title">💡 วิธีการแก้ไข</h4>
            <p class="detail-content">${campaign.details.solution}</p>
        </div>
        <div class="detail-section">
            <h4 class="detail-title">🎯 ผลกระทบที่คาดหวัง</h4>
            <p class="detail-content">${campaign.details.impact}</p>
        </div>
    `;
    
    document.getElementById('modalDetails').innerHTML = detailsHTML;
    document.getElementById('modalSupporters').textContent = `${campaign.supporters.toLocaleString()} คนสนับสนุน`;
    document.getElementById('modalTarget').textContent = `เป้าหมาย ${campaign.target.toLocaleString()} คน`;
    document.getElementById('modalProgress').style.width = `${progressPercent}%`;
    
    // Check if user already supported this campaign
    const isSupported = userSupports.has(campaignId);
    supportBtn.textContent = isSupported ? 'คุณสนับสนุนแล้ว' : 'ร่วมลงชื่อสนับสนุน';
    supportBtn.disabled = isSupported;
    
    // Set up support button
    supportBtn.onclick = () => supportCampaign(campaignId);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    successMessage.style.display = 'none';
}

// Support campaign
function supportCampaign(campaignId) {
    if (userSupports.has(campaignId)) return;
    
    // Add support
    userSupports.add(campaignId);
    
    // Update campaign data
    const campaign = campaignsData.find(c => c.id === campaignId);
    campaign.supporters += 1;
    
    // Update UI
    supportBtn.textContent = 'คุณสนับสนุนแล้ว';
    supportBtn.disabled = true;
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Update progress bar and stats
    const progressPercent = Math.min((campaign.supporters / campaign.target) * 100, 100);
    document.getElementById('modalSupporters').textContent = `${campaign.supporters.toLocaleString()} คนสนับสนุน`;
    document.getElementById('modalProgress').style.width = `${progressPercent}%`;
    
    // Re-render campaigns to update main page
    renderCampaigns();
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    closeBtn.onclick = closeModal;
    
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);