    <script src="https://d3js.org/d3.v6.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js"></script>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <script src="https://unpkg.com/d3-sankey@0.12.3/dist/d3-sankey.min.js"></script>


    <script>
          if (window.innerWidth < 768) {
            document.body.innerHTML = '<div style="text-align:center;padding:40px;font-size:1.5rem;color:white;background:#222;height:100vh;">📵 Please view this website on a larger screen.</div>';
          }
    </script>

    <!-- Add JavaScript for bubble generation and interactions -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Only initialize if we're on the AI Matrix tab
            if (document.getElementById('matrix-chart')) {
                initializeAIMatrix();
            }
        });

        function initializeAIMatrix() {
            const chartElement = document.getElementById('matrix-chart');
            if (!chartElement) return;
            const tooltip = document.getElementById('matrix-tooltip');
            
            const matrixData = [
                // Low Risk, High Reward – Optimal Zone
                {
            name: "Cloud\nProviders",
            category: "cloud",
            risk: 2.2,
            reward: 9.4,
            value: 3300,
            trend: "up",
            details: {
                title: "Cloud Infrastructure Leaders",
                companies: "AWS, Microsoft Azure, Google Cloud",
                marketSize: "$330B (2024)",
                growth: "GenAI driving 50% of growth",
                keyPlayers: "AWS (30%), Azure (21%), GCP (12%)",
                risks: "Massive capex requirements",
                opportunities: "AI workloads, integrated services"
            }
        },
        {
            name: "Data Centers\n& AI Clouds",
            category: "datacenter",
            risk: 2.5,
            reward: 9.1,
            value: 200,
            trend: "up",
            details: {
                title: "AI-Optimized Data Centers",
                companies: "Equinix, Digital Realty, CoreWeave",
                marketSize: "$200B+ market",
                growth: "AI-specific facilities growing 40%+ YoY",
                keyPlayers: "Hyperscale and edge facilities",
                risks: "Power constraints, cooling requirements",
                opportunities: "Critical AI infrastructure demand"
            }
        },
        // High Performers
        {
            name: "NVIDIA",
            category: "semiconductor",
            risk: 3.5,
            reward: 9.2,
            value: 2900,
            trend: "up",
            isCompany: true,
            details: {
                title: "NVIDIA Corporation",
                companies: "GPU market leader",
                marketSize: "$2.9T market cap",
                growth: "93% YoY data center growth",
                keyPlayers: "80-90% discrete GPU share",
                risks: "Competition from AMD",
                opportunities: "Blackwell chips, AI dominance"
            }
        },
        // {
        //     name: "OpenAI",
        //     category: "model-dev",
        //     risk: 7.8,
        //     reward: 9.6,
        //     value: 300,
        //     trend: "up",
        //     isCompany: true,
        //     details: {
        //         title: "OpenAI",
        //         companies: "ChatGPT, GPT-4.5",
        //         marketSize: "$300B valuation",
        //         growth: "$11.6B projected 2025 revenue",
        //         keyPlayers: "17% global market share",
        //         risks: "Regulatory scrutiny",
        //         opportunities: "$125B revenue by 2029"
        //     }
        // },
        // {
        //     name: "Microsoft",
        //     category: "app-dev",
        //     risk: 2.8,
        //     reward: 8.8,
        //     value: 3000,
        //     trend: "up",
        //     isCompany: true,
        //     details: {
        //         title: "Microsoft AI",
        //         companies: "Azure AI, Copilot",
        //         marketSize: "$3T+ market cap",
        //         growth: "$13B AI annualized revenue",
        //         keyPlayers: "AI contributing 16pp to Azure",
        //         risks: "OpenAI dependency",
        //         opportunities: "Enterprise AI integration"
        //     }
        // },
        {
            name: "Model\nDevelopers",
            category: "model-dev",
            risk: 6.5,
            reward: 8.9,
            value: 150,
            trend: "up",
            details: {
                title: "Foundation Model Developers",
                companies: "Anthropic, Google DeepMind, Meta",
                marketSize: "Anthropic: $61.5B valuation",
                growth: "30% MoM growth",
                keyPlayers: "Google: 39% platform share",
                risks: "High capex, regulatory",
                opportunities: "Enterprise adoption"
            }
        },
        // Semiconductor and Hardware
        {
            name: "Semiconductor\nMfrs",
            category: "semiconductor",
            risk: 5.0,
            reward: 8.4,
            value: 1000,
            trend: "up",
            details: {
                title: "AI Chip Manufacturers",
                companies: "TSMC, AMD, Intel, Broadcom",
                marketSize: "$56.4B → $232.9B by 2033",
                growth: "TSMC 64.9% foundry share",
                keyPlayers: "AMD MI300X gaining traction",
                risks: "Supply chain concentration",
                opportunities: "Advanced node leadership"
            }
        },
        // {
        //     name: "SK Hynix",
        //     category: "memory",
        //     risk: 4.0,
        //     reward: 8.5,
        //     value: 120,
        //     trend: "up",
        //     isCompany: true,
        //     details: {
        //         title: "SK Hynix",
        //         companies: "HBM market leader",
        //         marketSize: "$120B market cap",
        //         growth: "50-53% HBM market share",
        //         keyPlayers: "Key NVIDIA supplier",
        //         risks: "Technical barriers",
        //         opportunities: "HBM3E demand surge"
        //     }
        // },
        {
            name: "Memory\nProviders",
            category: "memory",
            risk: 5.2,
            reward: 7.4,
            value: 56,
            details: {
                title: "AI Memory Manufacturers",
                companies: "Samsung, Micron",
                marketSize: "$56B HBM market",
                growth: "Explosive AI demand",
                keyPlayers: "Samsung: 38-40% share",
                risks: "Manufacturing complexity",
                opportunities: "Critical AI component"
            }
        },
        // Applications and Services
        // {
        //     name: "Healthcare\nAI",
        //     category: "ai-users",
        //     risk: 3.2,
        //     reward: 8.2,
        //     value: 39.25,
        //     trend: "up",
        //     details: {
        //         title: "Healthcare AI Adoption",
        //         companies: "Hospitals, pharma, diagnostics",
        //         marketSize: "$39.25B market",
        //         growth: "79% adoption rate",
        //         keyPlayers: "Drug discovery leaders",
        //         risks: "Regulatory approval",
        //         opportunities: "Life-saving applications"
        //     }
        // },
        // {
        //     name: "Edge AI",
        //     category: "edge",
        //     risk: 6.8,
        //     reward: 8.3,
        //     value: 16.45,
        //     trend: "up",
        //     details: {
        //         title: "Edge Computing & AI",
        //         companies: "Qualcomm, Intel, ARM",
        //         marketSize: "$16.45B → $155.9B by 2030",
        //         growth: "36.9% CAGR",
        //         keyPlayers: "Fragmented market",
        //         risks: "Technical complexity",
        //         opportunities: "IoT, autonomous systems"
        //     }
        // },
        // {
        //     name: "Databricks",
        //     category: "data-provider",
        //     risk: 5.5,
        //     reward: 7.8,
        //     value: 62,
        //     trend: "up",
        //     isCompany: true,
        //     details: {
        //         title: "Databricks",
        //         companies: "Unified analytics platform",
        //         marketSize: "$62B valuation",
        //         growth: "$3.8B projected 2025 revenue",
        //         keyPlayers: "Highest valued data platform",
        //         risks: "Cloud provider competition",
        //         opportunities: "IPO potential"
        //     }
        // },
        // Financial and Enterprise
        {
            name: "Financial\nServices",
            category: "ai-users",
            risk: 2.5,
            reward: 7.5,
            value: 35,
            trend: "up",
            details: {
                title: "Financial Services AI",
                companies: "Banks, insurance, trading",
                marketSize: "$35B → $97B by 2027",
                growth: "29% CAGR",
                keyPlayers: "Risk assessment, fraud",
                risks: "Regulatory compliance",
                opportunities: "Operational efficiency"
            }
        },
        {
            name: "Enterprise\nUsers",
            category: "ai-users",
            risk: 1.8,
            reward: 7.0,
            value: 350,
            details: {
                title: "Enterprise AI Adoption",
                companies: "All major industries",
                marketSize: "$350B+ combined spending",
                growth: "72% adoption rate",
                keyPlayers: "Fortune 500 companies",
                risks: "ROI measurement",
                opportunities: "Proven productivity gains"
            }
        },
        // {
        //     name: "App\nDevelopers",
        //     category: "app-dev",
        //     risk: 4.3,
        //     reward: 7.5,
        //     value: 80,
        //     details: {
        //         title: "Enterprise AI Applications",
        //         companies: "Salesforce, ServiceNow, Adobe",
        //         marketSize: "35% of global AI revenue",
        //         growth: "ServiceNow targeting $1B",
        //         keyPlayers: "Salesforce: 80B predictions/day",
        //         risks: "Integration complexity",
        //         opportunities: "Workflow automation"
        //     }
        // },
        // Data and Infrastructure
        {
            name: "Data & MLOps",
            category: "data-provider",
            risk: 4.8,
            reward: 6.8,
            value: 40,
            details: {
                title: "Data & ML Infrastructure",
                companies: "Scale AI, Hugging Face, Appen",
                marketSize: "$18.6B → $49.2B by 2033",
                growth: "Scale AI: $870M → $2B",
                keyPlayers: "Hugging Face: 1M+ models",
                risks: "Competitive fragmentation",
                opportunities: "Enterprise MLOps"
            }
        },
        {
            name: "Vector DB",
            category: "data-provider",
            risk: 6.5,
            reward: 6.5,
            value: 2.2,
            trend: "up",
            details: {
                title: "Vector Databases",
                companies: "Pinecone, Weaviate, Qdrant",
                marketSize: "$2.2B → $15B by 2030",
                growth: "Essential for LLMs",
                keyPlayers: "Pinecone: $750M valuation",
                risks: "Early stage market",
                opportunities: "RAG adoption"
            }
        },
        // Middle Tier
        {
            name: "Chinese AI",
            category: "model-dev",
            risk: 7.5,
            reward: 6.6,
            value: 50,
            details: {
                title: "Chinese Model Developers",
                companies: "Baidu, Alibaba, ByteDance",
                marketSize: "$50B+ combined value",
                growth: "Near-parity performance",
                keyPlayers: "Lower cost advantage",
                risks: "Export controls",
                opportunities: "Domestic market"
            }
        },
        {
            name: "AI Consulting",
            category: "consulting",
            risk: 3.5,
            reward: 6.0,
            value: 90,
            details: {
                title: "AI Consulting & Advisory",
                companies: "Accenture, Deloitte, BCG",
                marketSize: "$900M GenAI revenue",
                growth: "40% revenue from AI by 2026",
                keyPlayers: "$3B+ AI bookings",
                risks: "Talent shortage",
                opportunities: "Enterprise transformation"
            }
        },
        {
            name: "AI Hardware\nStartups",
            category: "semiconductor",
            risk: 8.5,
            reward: 7.5,
            value: 10,
            trend: "down",
            details: {
                title: "Alternative AI Chips",
                companies: "Cerebras, Graphcore",
                marketSize: "$10B+ valuations",
                growth: "Challenging NVIDIA",
                keyPlayers: "Specialized architectures",
                risks: "Competing with giants",
                opportunities: "Niche applications"
            }
        },
        // Lower Reward Quadrants
        {
            name: "Traditional\nIT Services",
            category: "consulting",
            risk: 2.0,
            reward: 4.5,
            value: 150,
            details: {
                title: "Traditional IT Services",
                companies: "IBM, Cognizant, Infosys, TCS",
                marketSize: "$150B+ market",
                growth: "Single-digit growth",
                keyPlayers: "Legacy system integration",
                risks: "Disruption from AI-native firms",
                opportunities: "AI transformation services"
            }
        },
        {
            name: "Open Source\nAI Projects",
            category: "research",
            risk: 3.0,
            reward: 3.5,
            value: 5,
            details: {
                title: "Open Source AI Initiatives",
                companies: "Linux Foundation, Apache, Mozilla",
                marketSize: "Community-driven",
                growth: "High adoption, low monetization",
                keyPlayers: "LangChain, Stable Diffusion",
                risks: "Sustainability challenges",
                opportunities: "Community innovation"
            }
        },
        {
            name: "AI Ethics &\nGovernance",
            category: "consulting",
            risk: 4.5,
            reward: 4.0,
            value: 2,
            details: {
                title: "AI Ethics Organizations",
                companies: "Partnership on AI, AI Now Institute",
                marketSize: "$2B+ funding",
                growth: "Growing importance",
                keyPlayers: "Non-profits, think tanks",
                risks: "Limited revenue models",
                opportunities: "Regulatory advisory"
            }
        },
        {
            name: "Government\nAI Programs",
            category: "ai-users",
            risk: 3.8,
            reward: 4.2,
            value: 50,
            details: {
                title: "Public Sector AI",
                companies: "Defense, Healthcare, Smart Cities",
                marketSize: "$50B+ spending",
                growth: "15% CAGR",
                keyPlayers: "DoD, NHS, Singapore",
                risks: "Procurement complexity",
                opportunities: "Large contracts"
            }
        },
        {
            name: "AI Education\nPlatforms",
            category: "app-dev",
            risk: 5.0,
            reward: 5.0,
            value: 8,
            details: {
                title: "AI Training & Education",
                companies: "Coursera, Udacity, Fast.ai",
                marketSize: "$8B market",
                growth: "25% CAGR",
                keyPlayers: "Online learning platforms",
                risks: "Content commoditization",
                opportunities: "Enterprise training"
            }
        },
        {
            name: "Legacy Data\nAnalytics",
            category: "data-provider",
            risk: 2.5,
            reward: 3.8,
            value: 60,
            details: {
                title: "Traditional Analytics",
                companies: "SAS, SPSS, Tableau",
                marketSize: "$60B market",
                growth: "Low single-digit growth",
                keyPlayers: "Business intelligence tools",
                risks: "AI disruption",
                opportunities: "AI integration"
            }
        },
        {
            name: "AI Testing &\nQA Tools",
            category: "app-dev",
            risk: 5.5,
            reward: 6.0,
            value: 3,
            details: {
                title: "AI Testing Solutions",
                companies: "Testim, Applitools, Mabl",
                marketSize: "$3B market",
                growth: "30% CAGR",
                keyPlayers: "QA automation startups",
                risks: "Market education needed",
                opportunities: "Growing AI complexity"
            }
        },
        {
            name: "Commoditized\nAI APIs",
            category: "app-dev",
            risk: 4.0,
            reward: 3.5,
            value: 15,
            details: {
                title: "Basic AI API Services",
                companies: "OCR, Translation, Basic NLP",
                marketSize: "$15B market",
                growth: "Price compression",
                keyPlayers: "Google, AWS, Azure APIs",
                risks: "Race to bottom pricing",
                opportunities: "Volume plays"
            }
        },
        {
            name: "AI Content\nModeration",
            category: "app-dev",
            risk: 5.5,
            reward: 4.5,
            value: 5,
            details: {
                title: "Content Moderation AI",
                companies: "Spectrum Labs, Hive, Two Hat",
                marketSize: "$5B market",
                growth: "20% CAGR",
                keyPlayers: "Trust & safety platforms",
                risks: "Regulatory complexity",
                opportunities: "Platform growth"
            }
        },
        {
            name: "Academic\nAI Research",
            category: "research",
            risk: 7.0,
            reward: 3.0,
            value: 30,
            details: {
                title: "University AI Programs",
                companies: "MIT, Stanford, CMU, Oxford",
                marketSize: "$30B+ funding",
                growth: "Grant-dependent",
                keyPlayers: "Top universities",
                risks: "Brain drain to industry",
                opportunities: "Fundamental research"
            }
        },
        {
            name: "AI Chiplets",
            category: "semiconductor",
            risk: 7.5,
            reward: 5.5,
            value: 4,
            details: {
                title: "Modular AI Chip Design",
                companies: "UCIe consortium members",
                marketSize: "$4B emerging market",
                growth: "Early stage",
                keyPlayers: "Intel, AMD initiatives",
                risks: "Standards adoption",
                opportunities: "Cost reduction"
            }
        },
        {
            name: "Research\nOrgs",
            category: "research",
            risk: 8.2,
            reward: 5.0,
            value: 20,
            trend: "down",
            details: {
                title: "Research Labs & Academia",
                companies: "Academic labs",
                marketSize: "$20B+ funding",
                growth: "High innovation output",
                keyPlayers: "Stanford HAI, MIT",
                risks: "Commercialization challenges",
                opportunities: "Breakthrough innovations"
            }
        },
        // New Critical AI Infrastructure
        // {
        //     name: "Energy &\nPower Infra",
        //     category: "power",
        //     risk: 3.2,
        //     reward: 8.7,
        //     value: 250,
        //     trend: "up",
        //     details: {
        //         title: "AI Power Infrastructure",
        //         companies: "NextEra, Constellation, Vistra",
        //         marketSize: "$250B+ market opportunity",
        //         growth: "AI driving 20GW+ new demand",
        //         keyPlayers: "Nuclear restarts, renewable PPAs",
        //         risks: "Grid constraints, permitting",
        //         opportunities: "Critical AI enabler"
        //     }
        // },
        // {
        //     name: "Network\nEquipment",
        //     category: "datacenter",
        //     risk: 3.8,
        //     reward: 8.2,
        //     value: 180,
        //     trend: "up",
        //     details: {
        //         title: "AI Networking Infrastructure",
        //         companies: "Arista, Cisco, Juniper",
        //         marketSize: "$180B market",
        //         growth: "400G/800G adoption surge",
        //         keyPlayers: "Arista: 35% AI network share",
        //         risks: "Technology transitions",
        //         opportunities: "AI cluster connectivity"
        //     }
        // },
        // {
        //     name: "Cooling &\nThermal Mgmt",
        //     category: "datacenter",
        //     risk: 4.5,
        //     reward: 7.8,
        //     value: 45,
        //     trend: "up",
        //     details: {
        //         title: "AI Cooling Solutions",
        //         companies: "Vertiv, Schneider, Johnson Controls",
        //         marketSize: "$45B → $120B by 2030",
        //         growth: "Liquid cooling adoption",
        //         keyPlayers: "Direct-to-chip cooling leaders",
        //         risks: "Technical complexity",
        //         opportunities: "GPU thermal management"
        //     }
        // },
        {
            name: "AI Security",
            category: "security",
            risk: 5.2,
            reward: 8.0,
            value: 25,
            trend: "up",
            details: {
                title: "AI-Specific Security",
                companies: "Anthropic Shield, Robust Intelligence",
                marketSize: "$25B → $80B by 2030",
                growth: "45% CAGR",
                keyPlayers: "Model security, prompt injection defense",
                risks: "Evolving threat landscape",
                opportunities: "Critical for enterprise adoption"
            }
        },
        {
            name: "Synthetic\nData",
            category: "data-provider",
            risk: 6.2,
            reward: 7.5,
            value: 8,
            trend: "up",
            details: {
                title: "Synthetic Data Generation",
                companies: "Synthesis AI, Mostly AI, Gretel",
                marketSize: "$8B → $35B by 2030",
                growth: "Privacy-compliant training data",
                keyPlayers: "Addressing data scarcity",
                risks: "Quality validation",
                opportunities: "Regulated industries"
            }
        },
        // {
        //     name: "GPU Cloud\nProviders",
        //     category: "cloud",
        //     risk: 5.5,
        //     reward: 8.5,
        //     value: 40,
        //     trend: "up",
        //     details: {
        //         title: "Specialized GPU Cloud",
        //         companies: "Lambda Labs, Paperspace, RunPod",
        //         marketSize: "$40B market",
        //         growth: "Lower cost than hyperscalers",
        //         keyPlayers: "Serving AI startups",
        //         risks: "Hyperscaler competition",
        //         opportunities: "GPU shortage beneficiary"
        //     }
        // },
        // {
        //     name: "Robotics &\nAutomation",
        //     category: "edge",
        //     risk: 7.2,
        //     reward: 8.8,
        //     value: 85,
        //     trend: "up",
        //     details: {
        //         title: "AI-Powered Robotics",
        //         companies: "Boston Dynamics, Figure, Tesla",
        //         marketSize: "$85B → $380B by 2030",
        //         growth: "Humanoid robots emerging",
        //         keyPlayers: "Manufacturing, logistics leaders",
        //         risks: "Technical challenges",
        //         opportunities: "Physical AI revolution"
        //     }
        // },
        {
            name: "AI Observability",
            category: "data-provider",
            risk: 5.8,
            reward: 7.2,
            value: 12,
            trend: "up",
            details: {
                title: "AI/ML Monitoring Tools",
                companies: "Datadog, Weights & Biases, Neptune",
                marketSize: "$12B market",
                growth: "Essential for production AI",
                keyPlayers: "Model performance tracking",
                risks: "Market fragmentation",
                opportunities: "MLOps maturity"
            }
        },
        {
            name: "Quantum\nComputing",
            category: "semiconductor",
            risk: 9.2,
            reward: 7.0,
            value: 30,
            trend: "up",
            details: {
                title: "Quantum-AI Convergence",
                companies: "IBM, Google, IonQ, Rigetti",
                marketSize: "$30B investments",
                growth: "Quantum ML algorithms",
                keyPlayers: "1000+ qubit systems",
                risks: "Technical uncertainty",
                opportunities: "Next-gen AI compute"
            }
        },
        // {
        //     name: "AI Storage\nSolutions",
        //     category: "datacenter",
        //     risk: 4.2,
        //     reward: 7.6,
        //     value: 65,
        //     trend: "up",
        //     details: {
        //         title: "AI-Optimized Storage",
        //         companies: "Pure Storage, NetApp, DDN",
        //         marketSize: "$65B market",
        //         growth: "High-bandwidth storage demand",
        //         keyPlayers: "NVMe, parallel file systems",
        //         risks: "Rapid tech evolution",
        //         opportunities: "Training data management"
        //     }
        // },
        // {
        //     name: "Telecom\n5G/6G",
        //     category: "edge",
        //     risk: 4.8,
        //     reward: 7.3,
        //     value: 380,
        //     trend: "up",
        //     details: {
        //         title: "Telecom Infrastructure for AI",
        //         companies: "Verizon, AT&T, T-Mobile",
        //         marketSize: "$380B market",
        //         growth: "Edge AI enabling infrastructure",
        //         keyPlayers: "Private 5G for enterprises",
        //         risks: "Capex intensity",
        //         opportunities: "Low-latency AI apps"
        //     }
        // },
        // {
        //     name: "EDA for\nAI Chips",
        //     category: "semiconductor",
        //     risk: 3.5,
        //     reward: 8.0,
        //     value: 22,
        //     trend: "up",
        //     details: {
        //         title: "AI Chip Design Software",
        //         companies: "Synopsys, Cadence, Ansys",
        //         marketSize: "$22B market",
        //         growth: "AI-driven chip design",
        //         keyPlayers: "3nm and below enablers",
        //         risks: "R&D intensive",
        //         opportunities: "Critical design tools"
        //     }
        // },
        {
            name: "Data\nLabeling",
            category: "data-provider",
            risk: 6.0,
            reward: 5.8,
            value: 15,
            details: {
                title: "Human-in-the-Loop Services",
                companies: "Labelbox, Snorkel AI, Sama",
                marketSize: "$15B market",
                growth: "RLHF and fine-tuning demand",
                keyPlayers: "Specialized annotation",
                risks: "Automation threat",
                opportunities: "Quality training data"
            }
        },
        {
            name: "AI Drug\nDiscovery",
            category: "ai-users",
            risk: 8.0,
            reward: 9.0,
            value: 120,
            trend: "up",
            details: {
                title: "AI-First Pharma",
                companies: "Recursion, Insitro, Atomwise",
                marketSize: "$120B market potential",
                growth: "10x faster drug development",
                keyPlayers: "Multiple Phase 2/3 trials",
                risks: "Regulatory approval",
                opportunities: "Revolutionary treatments"
            }
        },
        // {
        //     name: "Battery &\nEnergy Storage",
        //     category: "edge",
        //     risk: 5.5,
        //     reward: 7.7,
        //     value: 140,
        //     trend: "up",
        //     details: {
        //         title: "Energy Storage for AI",
        //         companies: "Tesla Energy, Fluence, LG Energy",
        //         marketSize: "$140B market",
        //         growth: "Grid-scale storage for AI centers",
        //         keyPlayers: "4-hour+ duration systems",
        //         risks: "Supply chain constraints",
        //         opportunities: "24/7 AI operations"
        //     }
        // },
        {
            name: "AI Accelerator\nStartups",
            category: "semiconductor",
            risk: 8.8,
            reward: 6.5,
            value: 25,
            details: {
                title: "Next-Gen AI Accelerators",
                companies: "Groq, SambaNova, Tenstorrent",
                marketSize: "$25B+ funding raised",
                growth: "Alternative architectures",
                keyPlayers: "Inference optimization",
                risks: "NVIDIA dominance",
                opportunities: "Specialized use cases"
            }
        },
        {
            name: "Autonomous\nVehicles",
            category: "edge",
            risk: 8.0,
            reward: 8.0,
            value: 180,
            trend: "up",
            details: {
                title: "Self-Driving Technology",
                companies: "Waymo, Cruise, Tesla FSD",
                marketSize: "$180B market by 2030",
                growth: "Level 4/5 deployment",
                keyPlayers: "Robotaxi services live",
                risks: "Regulatory hurdles",
                opportunities: "$1.6T transport market"
            }
        },
        // {
        //     name: "AI-Native\nDatabases",
        //     category: "data-provider",
        //     risk: 5.8,
        //     reward: 7.0,
        //     value: 18,
        //     trend: "up",
        //     details: {
        //         title: "AI-First Database Systems",
        //         companies: "SingleStore, ClickHouse, Vespa",
        //         marketSize: "$18B emerging market",
        //         growth: "Real-time AI inference",
        //         keyPlayers: "Vector + traditional hybrid",
        //         risks: "Market education",
        //         opportunities: "Next-gen data infrastructure"
        //     }
        // },
        // New High-Risk, High-Reward Opportunities
        {
            name: "AGI\nResearch",
            category: "model-dev",
            risk: 9.5,
            reward: 9.8,
            value: 50,
            trend: "up",
            details: {
                title: "Artificial General Intelligence",
                companies: "DeepMind, Anthropic (Claude), OpenAI",
                marketSize: "$50B+ R&D investments",
                growth: "Breakthrough potential by 2030",
                keyPlayers: "Racing toward human-level AI",
                risks: "Technical uncertainty, safety concerns",
                opportunities: "Transformative technology"
            }
        },
        {
            name: "Brain-Computer\nInterfaces",
            category: "edge",
            risk: 8.8,
            reward: 9.2,
            value: 35,
            trend: "up",
            details: {
                title: "Neural Interface Technology",
                companies: "Neuralink, Synchron, Paradromics",
                marketSize: "$35B market by 2030",
                growth: "FDA approvals accelerating",
                keyPlayers: "Neuralink human trials",
                risks: "Regulatory, ethical challenges",
                opportunities: "$400B healthcare market"
            }
        },
        // {
        //     name: "AI Avatars &\nDigital Humans",
        //     category: "app-dev",
        //     risk: 7.0,
        //     reward: 8.6,
        //     value: 22,
        //     trend: "up",
        //     details: {
        //         title: "Photorealistic AI Avatars",
        //         companies: "Synthesia, Hour One, Soul Machines",
        //         marketSize: "$22B → $125B by 2030",
        //         growth: "Enterprise adoption surge",
        //         keyPlayers: "Customer service, entertainment",
        //         risks: "Deepfake concerns",
        //         opportunities: "Metaverse integration"
        //     }
        // },
        // {
        //     name: "Longevity\nAI",
        //     category: "ai-users",
        //     risk: 8.5,
        //     reward: 9.5,
        //     value: 60,
        //     trend: "up",
        //     details: {
        //         title: "AI-Powered Life Extension",
        //         companies: "Altos Labs, Calico, Juvenescence",
        //         marketSize: "$60B+ funding committed",
        //         growth: "Reversing aging markers",
        //         keyPlayers: "Bezos, Google backing",
        //         risks: "Long development cycles",
        //         opportunities: "$600B longevity market"
        //     }
        // },
        // {
        //     name: "Decentralized\nAI",
        //     category: "model-dev",
        //     risk: 8.2,
        //     reward: 8.4,
        //     value: 15,
        //     trend: "up",
        //     details: {
        //         title: "Blockchain-Based AI Networks",
        //         companies: "Bittensor, Fetch.ai, SingularityNET",
        //         marketSize: "$15B market cap",
        //         growth: "Distributed compute networks",
        //         keyPlayers: "Democratizing AI access",
        //         risks: "Technical complexity",
        //         opportunities: "Web3 AI convergence"
        //     }
        // },
        // {
        //     name: "AI Space\nTech",
        //     category: "edge",
        //     risk: 9.0,
        //     reward: 8.8,
        //     value: 45,
        //     trend: "up",
        //     details: {
        //         title: "AI for Space Exploration",
        //         companies: "SpaceX AI, Planet Labs, Orbital Insight",
        //         marketSize: "$45B space AI market",
        //         growth: "Autonomous spacecraft, analysis",
        //         keyPlayers: "Satellite constellation AI",
        //         risks: "High capital requirements",
        //         opportunities: "$1T space economy"
        //     }
        // },
        // {
        //     name: "Neuromorphic\nComputing",
        //     category: "semiconductor",
        //     risk: 8.3,
        //     reward: 8.5,
        //     value: 12,
        //     trend: "up",
        //     details: {
        //         title: "Brain-Inspired Processors",
        //         companies: "Intel Loihi, IBM TrueNorth, BrainChip",
        //         marketSize: "$12B → $75B by 2030",
        //         growth: "1000x energy efficiency",
        //         keyPlayers: "Event-driven computing",
        //         risks: "Software ecosystem gap",
        //         opportunities: "Edge AI revolution"
        //     }
        // },
        // {
        //     name: "AI Content\nCreation",
        //     category: "app-dev",
        //     risk: 6.8,
        //     reward: 8.7,
        //     value: 85,
        //     trend: "up",
        //     details: {
        //         title: "Generative AI Platforms",
        //         companies: "Runway, Midjourney, Stability AI",
        //         marketSize: "$85B creator economy impact",
        //         growth: "Video, music, 3D generation",
        //         keyPlayers: "Hollywood adoption",
        //         risks: "Copyright challenges",
        //         opportunities: "$230B content market"
        //     }
        // },
        // {
        //     name: "Climate AI",
        //     category: "ai-users",
        //     risk: 7.3,
        //     reward: 8.9,
        //     value: 70,
        //     trend: "up",
        //     details: {
        //         title: "AI for Climate Solutions",
        //         companies: "Carbon capture AI, fusion AI control",
        //         marketSize: "$70B climate tech AI",
        //         growth: "Critical for net zero",
        //         keyPlayers: "Google, Microsoft initiatives",
        //         risks: "Policy dependency",
        //         opportunities: "$10T climate transition"
        //     }
        // },
        {
            name: "Photonic\nAI Chips",
            category: "semiconductor",
            risk: 9.1,
            reward: 8.3,
            value: 8,
            trend: "up",
            details: {
                title: "Light-Based AI Computing",
                companies: "Lightmatter, Luminous, Lightelligence",
                marketSize: "$8B emerging market",
                growth: "100x speed potential",
                keyPlayers: "Optical neural networks",
                risks: "Manufacturing challenges",
                opportunities: "Beyond Moore's Law"
            }
        },
        {
            name: "AI Materials\nDiscovery",
            category: "ai-users",
            risk: 7.8,
            reward: 8.6,
            value: 28,
            trend: "up",
            details: {
                title: "AI-Accelerated Materials Science",
                companies: "Materials Project, Citrine, Kebotix",
                marketSize: "$28B market",
                growth: "1000x faster discovery",
                keyPlayers: "Battery, semiconductor materials",
                risks: "Lab-to-market gap",
                opportunities: "Revolutionary materials"
            }
        },
        {
            name: "AI Regulation\nTech",
            category: "consulting",
            risk: 6.5,
            reward: 7.8,
            value: 10,
            trend: "up",
            details: {
                title: "AI Compliance Platforms",
                companies: "Credo AI, Fiddler, Truera",
                marketSize: "$10B → $50B by 2028",
                growth: "EU AI Act driving demand",
                keyPlayers: "Model governance tools",
                risks: "Regulatory uncertainty",
                opportunities: "Mandatory compliance"
            }
        },
        // {
        //     name: "Embodied AI\nAssistants",
        //     category: "edge",
        //     risk: 7.7,
        //     reward: 8.8,
        //     value: 95,
        //     trend: "up",
        //     details: {
        //         title: "Physical AI Assistants",
        //         companies: "1X Technologies, Agility Robotics",
        //         marketSize: "$95B humanoid robot market",
        //         growth: "Home and workplace adoption",
        //         keyPlayers: "OpenAI-backed ventures",
        //         risks: "Consumer acceptance",
        //         opportunities: "Labor shortage solution"
        //     }
        // },
        {
            name: "AI Financial\nModels",
            category: "ai-users",
            risk: 6.2,
            reward: 8.5,
            value: 110,
            trend: "up",
            details: {
                title: "AI Trading & Risk Systems",
                companies: "Two Sigma, Renaissance, Citadel",
                marketSize: "$110B quant fund AUM",
                growth: "LLMs for market analysis",
                keyPlayers: "70% of trades AI-driven",
                risks: "Market manipulation concerns",
                opportunities: "Alpha generation"
            }
        },
        {
            name: "Multimodal\nAI Systems",
            category: "model-dev",
            risk: 7.3,
            reward: 9.1,
            value: 75,
            trend: "up",
            details: {
                title: "Vision-Language-Action Models",
                companies: "Google Gemini, GPT-4V, Claude Vision",
                marketSize: "$75B market impact",
                growth: "True AI understanding",
                keyPlayers: "Real-world AI agents",
                risks: "Compute intensity",
                opportunities: "AGI stepping stone"
            }
        },
        {
            name: "AI Gaming\nEngines",
            category: "app-dev",
            risk: 6.7,
            reward: 8.2,
            value: 55,
            trend: "up",
            details: {
                title: "AI-Native Game Development",
                companies: "Roblox AI, Unity AI, Unreal AI",
                marketSize: "$55B gaming AI market",
                growth: "Procedural worlds, NPCs",
                keyPlayers: "AAA studio adoption",
                risks: "Creative control balance",
                opportunities: "$300B gaming market"
            }
        }
            ];

            // Remove any existing bubbles (so re-initializing doesn’t duplicate)
            const existingBubbles = chartElement.querySelectorAll('.matrix-bubble');
            existingBubbles.forEach(b => b.remove());
            
            // Map “value” → pixel radius between 20 and 65
            function getRadius(value) {
                const minRadius = 20;
                const maxRadius = 65;
                const logValue = Math.log10(value + 1);
                const logMax = Math.log10(3300 + 1);
                return minRadius + (maxRadius - minRadius) * (logValue / logMax);
            }
            
            // Basic collision check between two circles in pixel space
            function checkCollision(x1, y1, r1, x2, y2, r2) {
                const dx = x1 - x2;
                const dy = y1 - y2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const buffer = 5; // Small gap
                return distance < (r1 + r2 + buffer);
            }
            
            // Find a spiral‐based offset from (baseX, baseY) that doesn’t collide
            function findPosition(baseX, baseY, radius, placedBubbles, attempts = 0) {
                if (attempts > 100) {
                    // If we’ve tried too many times, just return the base location
                    return { x: baseX, y: baseY };
                }
                
                let x = baseX;
                let y = baseY;
                if (attempts > 0) {
                    const angle = (attempts * 137.5) * Math.PI / 180;
                    const distance = attempts * 0.5; // small step in percentage space
                    x = baseX + Math.cos(angle) * distance;
                    y = baseY + Math.sin(angle) * distance;
                }
                
                // Keep inside [3%, 97%] to avoid touching edges
                const marginPercent = 3;
                x = Math.max(marginPercent, Math.min(100 - marginPercent, x));
                y = Math.max(marginPercent, Math.min(100 - marginPercent, y));
                
                // Convert this candidate percent→pixel
                const chartWidth = chartElement.offsetWidth;
                const chartHeight = chartElement.offsetHeight;
                const xPx = (x / 100) * chartWidth;
                const yPx = (y / 100) * chartHeight;
                
                // Check collision against all already‐placed bubbles
                for (const placed of placedBubbles) {
                    const placedXPx = (placed.x / 100) * chartWidth;
                    const placedYPx = (placed.y / 100) * chartHeight;
                    if (checkCollision(xPx, yPx, radius, placedXPx, placedYPx, placed.radius)) {
                        return findPosition(baseX, baseY, radius, placedBubbles, attempts + 1);
                    }
                }
                
                // No collision → accept
                return { x, y };
            }
            
            // Sort descending by “value” so the largest bubble is placed first
            const sortedData = [...matrixData].sort((a, b) => b.value - a.value);
            const placedBubbles = [];
            
            sortedData.forEach((item, index) => {
                const radius = getRadius(item.value);
                const diameter = radius * 2;
                const isSmall = diameter < 45;
                
                const bubble = document.createElement('div');
                bubble.className = [
                    'matrix-bubble',
                    item.category,
                    item.isCompany ? 'company' : '',
                    isSmall ? 'small' : ''
                ].join(' ').trim();
                
                // Convert risk/reward → [0..100]% (risk: 1→10 maps to 0→100; reward: 10→1 maps to 0→100)
                const baseX = ((item.risk - 1) / 9) * 100;
                const baseY = ((10 - item.reward) / 9) * 100;
                
                // Find a non‐overlapping percent‐position
                const pos = findPosition(baseX, baseY, radius, placedBubbles);
                placedBubbles.push({ x: pos.x, y: pos.y, radius });
                
                // Apply CSS sizing and centering
                bubble.style.width = `${diameter}px`;
                bubble.style.height = `${diameter}px`;
                bubble.style.left = `${pos.x}%`;
                bubble.style.top = `${pos.y}%`;
                bubble.style.transform = `translate(-50%, -50%)`;
                bubble.style.animationDelay = `${index * 0.02}s`;
                
                // Set font size so label scales with bubble
                const fontSize = Math.max(10, Math.min(14, diameter / 5));
                bubble.style.fontSize = `${fontSize}px`;
                bubble.style.lineHeight = '1.1';
                
                // Create inner label (with line breaks as needed)
                const label = document.createElement('div');
                label.className = 'matrix-bubble-label';
                label.innerHTML = item.name.replace(/\n/g, '<br>');
                
                // If there’s a trend arrow, append it
                if (item.trend) {
                    const trend = document.createElement('span');
                    trend.className = `trend-indicator trend-${item.trend}`;
                    trend.textContent = (item.trend === 'up') ? '↗' : '↘';
                    label.appendChild(trend);
                }
                
                bubble.appendChild(label);
                bubble.dataset.item = JSON.stringify(item);
                
                // Tooltip: show on hover
                bubble.addEventListener('mouseenter', (e) => {
                    const data = JSON.parse(e.currentTarget.dataset.item);
                    const d = data.details || {};
                    let metricsHtml = '';
                    if (d) {
                        metricsHtml = `
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Companies:</span>
                                <span class="matrix-metric-value">${d.companies || ''}</span>
                            </div>
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Market Size:</span>
                                <span class="matrix-metric-value">${d.marketSize || ''}</span>
                            </div>
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Growth:</span>
                                <span class="matrix-metric-value">${d.growth || ''}</span>
                            </div>
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Key Players:</span>
                                <span class="matrix-metric-value">${d.keyPlayers || ''}</span>
                            </div>
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Risks:</span>
                                <span class="matrix-metric-value">${d.risks || ''}</span>
                            </div>
                            <div class="matrix-tooltip-metric">
                                <span class="matrix-metric-label">Opportunities:</span>
                                <span class="matrix-metric-value">${d.opportunities || ''}</span>
                            </div>
                        `;
                    }
                    tooltip.querySelector('.matrix-tooltip-title').textContent = d.title || data.name.replace(/\n/g, ' ');
                    tooltip.querySelector('.matrix-tooltip-content').innerHTML = metricsHtml;
                    tooltip.style.display = 'block';
                });
                
                // Move tooltip with mouse
                bubble.addEventListener('mousemove', (e) => {
                    const x = e.pageX + 10;
                    const y = e.pageY - tooltip.offsetHeight - 10;
                    const maxX = window.innerWidth - tooltip.offsetWidth - 20;
                    const maxY = window.innerHeight - tooltip.offsetHeight - 20;
                    tooltip.style.left = `${Math.min(x, maxX)}px`;
                    tooltip.style.top  = `${Math.max(20, Math.min(y, maxY))}px`;
                });
                
                // Hide tooltip on leave
                bubble.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
                
                chartElement.appendChild(bubble);
            });
        }

        // // Reinitialize matrix when switching tabs
        // function showTab(event, tabName) {
        //     // Hide all .tab-content
        //     const tabContents = document.querySelectorAll('.tab-content');
        //     tabContents.forEach(tab => tab.style.display = 'none');
            
        //     // Remove “active” from all .tab buttons
        //     const tabs = document.querySelectorAll('.tab');
        //     tabs.forEach(tab => tab.classList.remove('active'));
            
        //     // Show the selected tab
        //     const selectedTab = document.getElementById(tabName);
        //     if (selectedTab) {
        //         selectedTab.style.display = 'block';
        //     }
            
        //     // Mark the clicked tab as active
        //     if (event && event.target) {
        //         event.target.classList.add('active');
        //     }
            
        //     // If we switched to “ai-matrix,” re-draw the bubbles
        //     if (tabName === 'ai-matrix') {
        //         setTimeout(() => {
        //             initializeAIMatrix();
        //         }, 100);
        //     }
        // }
    </script>

    <script>
        function toggleDataPoint(index) {
            const content = document.getElementById(`data-content-${index}`);
            const arrow = document.getElementById(`data-arrow-${index}`);
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    </script>

    <script>
        // Initialize charts when page loads
        window.addEventListener('load', function() {
            // Data for both charts
            const players = [
                { name: 'Cloud Providers', risk: 1, reward: 9, size: 140, color: '#00ACC1' },
                { name: 'Semiconductor\nManufacturers', risk: 2, reward: 8, size: 130, color: '#0097A7' },
                { name: 'Data Providers', risk: 3, reward: 7, size: 110, color: '#4DD0E1' },
                { name: 'Application\nDevelopers', risk: 5, reward: 7, size: 120, color: '#00897B' },
                { name: 'AI Users', risk: 7, reward: 8, size: 125, color: '#BDBDBD' },
                { name: 'AI Research\nOrganizations', risk: 8, reward: 5, size: 100, color: '#FFB74D' },
                { name: 'Precious Metals &\nCommodities', risk: 2, reward: 6, size: 115, color: '#E53935' },
                { name: 'Consulting &\nAdvisory', risk: 4, reward: 6, size: 105, color: '#FF9800' }
            ];

            // Scatter Chart
            const scatterCtx = document.getElementById('scatterChart').getContext('2d');
            const scatterChart = new Chart(scatterCtx, {
                type: 'bubble',
                data: {
                    datasets: [{
                        label: 'AI Value Chain Players',
                        data: players.map(p => ({
                            x: p.risk,
                            y: p.reward,
                            r: p.size / 4,
                            backgroundColor: p.color + 'CC',
                            borderColor: p.color,
                            label: p.name,
                            borderWidth: 3
                        }))
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const data = players[context.dataIndex];
                                    return [
                                        data.name.replace('\n', ' '),
                                        `Risk Level: ${data.risk}`,
                                        `Reward Level: ${data.reward}`
                                    ];
                                }
                            },
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleFont: {
                                size: 16
                            },
                            bodyFont: {
                                size: 14
                            },
                            padding: 12
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Risk Level (1=Low, 10=High)',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            min: 0,
                            max: 9,
                            grid: {
                                color: '#e0e0e0'
                            },
                            ticks: {
                                font: {
                                    size: 14
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Reward Level (1=Low, 10=High)',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            min: 4,
                            max: 9.5,
                            grid: {
                                color: '#e0e0e0'
                            },
                            ticks: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                },
                plugins: [{
                    afterDatasetsDraw: function(chart) {
                        const ctx = chart.ctx;
                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach((element, index) => {
                                const data = dataset.data[index];
                                const x = element.x;
                                const y = element.y;
                                
                                ctx.save();
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.font = 'bold 13px Arial';
                                
                                const label = players[index].name;
                                const lines = label.split('\n');
                                const lineHeight = 16;
                                const startY = y - ((lines.length - 1) * lineHeight) / 2;
                                
                                // White outline for better readability
                                ctx.strokeStyle = 'white';
                                ctx.lineWidth = 3;
                                lines.forEach((line, i) => {
                                    ctx.strokeText(line, x, startY + (i * lineHeight));
                                });
                                
                                // Text fill
                                ctx.fillStyle = '#333';
                                lines.forEach((line, i) => {
                                    ctx.fillText(line, x, startY + (i * lineHeight));
                                });
                                
                                ctx.restore();
                            });
                        });
                    }
                }]
            });

            // Radar Chart
            const radarCtx = document.getElementById('radarChart').getContext('2d');
            const radarChart = new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: [
                        'Cloud Providers',
                        'Semiconductors',
                        'Data Providers',
                        'App Developers',
                        'Consulting',
                        'AI Users',
                        'Research Orgs',
                        'Commodities'
                    ],
                    datasets: [{
                        label: 'Risk Level',
                        data: [1, 2, 3, 5, 4, 7, 8, 2],
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(244, 67, 54, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }, {
                        label: 'Reward Level',
                        data: [9, 8, 7, 7, 6, 8, 5, 6],
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 16
                                },
                                padding: 25
                            }
                        }
                    },
                    scales: {
                        r: {
                            min: 0,
                            max: 10,
                            ticks: {
                                stepSize: 2,
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                color: '#e0e0e0'
                            },
                            pointLabels: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        });
    </script>

    <script>

        function toggleMedia(idx) {
              const content = document.getElementById(`media-content-${idx}`);
              const arrow   = document.getElementById(`media-arrow-${idx}`);
              const isOpen  = content.style.display === 'block';
              content.style.display = isOpen ? 'none' : 'block';
              arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }

        function showTab(tabName) {
            // Hide all tabs
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            const tabButtons = document.querySelectorAll('.tab');
            tabButtons.forEach(button => button.classList.remove('active'));
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
        
        function toggleQA(index) {
            const answer = document.getElementById('qa-answer-' + index);
            const arrow = document.getElementById('qa-arrow-' + index);
            
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                arrow.style.transform = 'rotate(90deg)';
            } else {
                answer.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        }

        // Data Points toggle
        function toggleDataPoint(index) {
            const content = document.getElementById('data-content-' + index);
            const arrow = document.getElementById('data-arrow-' + index);
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('active');
                arrow.style.transform = 'rotate(180deg)';
            }
        }    
    </script>


