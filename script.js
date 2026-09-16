/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://bgvqjwtmrsxmdbnzrvir.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_i2ui3LsFPPb3MsswH95lvw_-kexwNrQ";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   GLOBAL STATE
===================================================== */

let currentUser = null;
let isGuest = false;

let selectedMode = null;
let selectedIndustry = null;
let selectedDifficulty = null;

let savedGameData = null;


/* =====================================================
   INDUSTRIES
===================================================== */

const industries = {

    technology: {
        name: "💻 Technológie",

        products: [
            ["🎧 Bezdrôtové slúchadlá",25,39,6,5],
            ["🔋 Powerbanka",18,32,5,4],
            ["🖥️ Monitor",120,179,4,6],
            ["⌨️ Klávesnica",35,59,6,5],
            ["🖱️ Myš",20,39,7,6],
            ["📱 Smartfón",250,349,5,7],
            ["💻 Notebook",450,599,4,7],
            ["📷 Webkamera",35,69,5,5],
            ["🎙️ Mikrofón",50,89,5,4],
            ["🔌 Nabíjačka",8,19,8,6],
            ["🔊 Reproduktor",35,69,6,5],
            ["⌚ Smart hodinky",60,99,5,6]
        ]
    },

    fashion: {
        name: "👕 Móda",

        products: [
            ["👕 Tričko",12,25,7,7],
            ["👟 Tenisky",45,79,6,6],
            ["🧥 Mikina",30,59,5,5],
            ["👖 Rifle",35,69,6,6],
            ["🧢 Čiapka",8,19,7,5],
            ["🧦 Ponožky",3,9,8,7],
            ["🧤 Rukavice",6,15,5,5],
            ["🧣 Šál",8,20,5,4],
            ["👔 Košeľa",20,45,5,5],
            ["🩳 Šortky",15,35,6,5],
            ["🧥 Bunda",50,99,5,6],
            ["👗 Šaty",35,75,5,6]
        ]
    },

    gastro: {
        name: "🍔 Gastro",

        products: [
            ["🍔 Burger",4,9,9,7],
            ["🍕 Pizza",5,11,8,7],
            ["🥤 Nápoj",1,3,9,8],
            ["🍟 Hranolky",1.5,4,9,7],
            ["🌭 Hotdog",2,5,8,6],
            ["🌮 Tacos",3,7,7,6],
            ["🥪 Sendvič",2.5,6,8,6],
            ["🍩 Donut",1,3,7,5],
            ["🍦 Zmrzlina",1,3,8,6],
            ["☕ Káva",1,3,8,7],
            ["🥗 Šalát",2,6,6,5],
            ["🍰 Dezert",2,7,6,5]
        ]
    },

    cars: {
        name: "🚗 Autá",

        products: [
            ["🔧 Náhradné diely",80,130,5,5],
            ["🛞 Pneumatiky",150,220,5,6],
            ["✨ Detailing",40,90,6,4],
            ["🛢️ Motorový olej",25,45,7,6],
            ["🔋 Autobatéria",60,110,5,5],
            ["💡 Svetlá",70,120,4,5],
            ["🧽 Čistiaca sada",15,35,7,5],
            ["🚗 Autokamera",50,99,5,6],
            ["🛠️ Diagnostika",100,180,4,4],
            ["🧰 Náradie",40,80,6,5]
        ]
    },

    gaming: {
        name: "🎮 Gaming",

        products: [
            ["🎮 Herný ovládač",35,59,7,6],
            ["⌨️ Herná klávesnica",45,79,6,5],
            ["🖱️ Herná myš",25,49,7,6],
            ["🎧 Herný headset",40,79,7,6],
            ["🖥️ Herný monitor",150,249,5,7],
            ["🎙️ Herný mikrofón",55,99,5,5],
            ["🪑 Herná stolička",120,199,4,5],
            ["🖱️ Podložka",8,19,8,6],
            ["💡 RGB osvetlenie",10,29,6,6],
            ["🎮 Konzola",350,499,6,8],
            ["🔌 HDMI kábel",5,15,8,7],
            ["📷 Stream kamera",70,129,5,5]
        ]
    },

    sport: {
        name: "🏋️ Šport",

        products: [
            ["⚽ Futbalová lopta",15,29,7,5],
            ["👟 Kopačky",45,75,6,6],
            ["🏋️ Činky",30,55,5,5],
            ["🏀 Basketbalová lopta",15,30,5,5],
            ["🎾 Tenisová raketa",40,80,4,5],
            ["🚲 Cyklistická prilba",25,49,5,5],
            ["🧘 Podložka na cvičenie",15,35,7,4],
            ["🥊 Boxerské rukavice",25,50,5,5],
            ["🏃 Športové tričko",15,35,7,6],
            ["🎒 Športová taška",20,45,6,5]
        ]
    },

    eshop: {
        name: "📦 E-shop",

        products: [
            ["🎧 Slúchadlá",25,39,7,7],
            ["🎒 Batoh",20,39,6,6],
            ["🥤 Fľaša",8,19,7,6],
            ["🔌 Nabíjačka",7,18,8,6],
            ["📱 Puzdro",5,15,8,7],
            ["💡 LED pásik",8,22,7,6],
            ["🕶️ Slnečné okuliare",10,29,6,7],
            ["🧴 Kozmetická taštička",7,20,6,5],
            ["🧸 Plyšák",8,24,6,5],
            ["🔑 Prívesok",2,8,7,5]
        ]
    },

    services: {
        name: "🛠️ Služby",

        products: [
            ["🧹 Upratovanie",10,30,7,5],
            ["🔧 Oprava",20,55,6,5],
            ["💻 Tvorba webu",50,150,5,4],
            ["📱 Správa sociálnych sietí",30,100,6,5],
            ["🎨 Grafický dizajn",25,90,5,5],
            ["📸 Fotografovanie",40,120,5,4],
            ["🎬 Strih videa",35,110,5,5],
            ["🚗 Umývanie auta",10,35,8,6],
            ["📦 Donáška",8,25,7,6]
        ]
    },

    production: {
        name: "🏭 Výroba",

        products: [
            ["🪑 Nábytok",100,180,5,5],
            ["💡 Lampa",30,59,6,5],
            ["🗄️ Skrinka",70,130,5,5],
            ["🪵 Stôl",100,190,4,5],
            ["🪑 Stolička",35,70,6,5],
            ["🛏️ Posteľ",180,320,4,5],
            ["🪞 Zrkadlo",25,60,5,4],
            ["📚 Polica",30,75,6,5],
            ["🧰 Dielenský stôl",90,170,4,4]
        ]
    },

    realestate: {
        name: "🏠 Reality",

        products: [
            ["🏢 Byt",80000,95000,4,6],
            ["🏡 Dom",150000,180000,3,6],
            ["🏪 Obchodný priestor",120000,155000,3,5],
            ["🏭 Priemyselná hala",250000,320000,2,5],
            ["🌳 Pozemok",50000,70000,4,5],
            ["🏢 Kancelária",90000,120000,4,5]
        ]
    }
};


/* =====================================================
   CONVERT PRODUCTS
===================================================== */

Object.keys(industries).forEach(industryKey => {

    industries[industryKey].products =
        industries[industryKey].products.map(
            (product, index) => {

                return {
                    id:
                        industryKey +
                        "_" +
                        index,

                    name: product[0],
                    buy: product[1],
                    sell: product[2],
                    demand: product[3],
                    competition: product[4]
                };

            }
        );

});


/* =====================================================
   EMPLOYEES
===================================================== */

const employeeTypes = {

    salesperson: {
        name: "👨‍💼 Obchodník",
        description: "Prináša viac predajov.",
        price: 1000,
        salesBonus: 2
    },

    marketer: {
        name: "📢 Marketér",
        description: "Zvyšuje účinok marketingu.",
        price: 1500,
        salesBonus: 0
    },

    warehouse: {
        name: "📦 Skladník",
        description: "Pomáha so zásobami.",
        price: 800,
        salesBonus: 1
    },

    manager: {
        name: "👔 Manažér",
        description: "Zvyšuje efektivitu firmy.",
        price: 3000,
        salesBonus: 3
    }

};


/* =====================================================
   CUSTOMERS
===================================================== */

const customerTypes = {

    student: {
        name: "🎒 Študent",
        description: "Veľmi citlivý na cenu.",
        budget: 60,
        priceSensitivity: 2
    },

    normal: {
        name: "👤 Bežný zákazník",
        description: "Vyvážený zákazník.",
        budget: 150,
        priceSensitivity: 1
    },

    demanding: {
        name: "💎 Náročný zákazník",
        description: "Viac mu záleží na kvalite.",
        budget: 400,
        priceSensitivity: .7
    },

    business: {
        name: "🏢 Firemný zákazník",
        description: "Môže nakúpiť viac kusov.",
        budget: 1000,
        priceSensitivity: .5
    }

};


/* =====================================================
   MARKETING
===================================================== */

const marketingCampaigns = {

    social: {
        name: "📱 Sociálne siete",
        price: 300,
        customers: 15,
        satisfaction: 1
    },

    influencer: {
        name: "🎥 Influencer",
        price: 800,
        customers: 40,
        satisfaction: 2
    },

    billboard: {
        name: "🪧 Billboard",
        price: 1200,
        customers: 55,
        satisfaction: 1
    },

    premium: {
        name: "⭐ Prémiová kampaň",
        price: 2500,
        customers: 100,
        satisfaction: 3
    }

};


/* =====================================================
   GAME STATE
===================================================== */

function createDefaultGame() {

    return {

        companyName: "",

        money: 0,

        day: 1,

        revenue: 0,
        costs: 0,
        totalProfit: 0,

        todayRevenue: 0,
        todayCosts: 0,
        todayProfit: 0,

        customers: 0,
        customersToday: 0,
        buyersToday: 0,

        customerSatisfaction: 50,

        totalUnitsSold: 0,

        xp: 0,
        level: 1,

        marketingBonus: 0,
        marketingUsed: 0,

        employees: {
            salesperson: 0,
            marketer: 0,
            warehouse: 0,
            manager: 0
        },

        inventory: {},
        prices: {},
        market: {},

        moneyHistory: [],
        revenueHistory: [],

        achievements: [],

        dailyChallenge: null,
        weeklyChallenge: null,

        customerTypesToday: {},

        currentEvent: null,
        eventActive: false,
        eventUsed: false
    };
}

let game = createDefaultGame();


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    const screen =
        document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }

    const gameScreen =
        document.getElementById("gameScreen");

    if (id === "gameScreen") {
        gameScreen.classList.add("active");
    } else {
        gameScreen.classList.remove("active");
    }
}


/* =====================================================
   START
===================================================== */

function startGame() {

    showScreen("authScreen");

}


/* =====================================================
   MODES
===================================================== */

function chooseMode(mode) {

    selectedMode = mode;

    if (mode === "sandbox") {

        selectedDifficulty = "sandbox";

        showScreen("industryScreen");

        renderIndustries();

        return;
    }

    showScreen("industryScreen");

    renderIndustries();
}


/* =====================================================
   INDUSTRY
===================================================== */

function renderIndustries() {

    const container =
        document.getElementById(
            "industryContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    Object.keys(industries)
        .forEach(key => {

            const industry =
                industries[key];

            const button =
                document.createElement("button");

            button.className =
                "choice-card";

            button.innerHTML = `

                <span>
                    ${industry.name.split(" ")[0]}
                </span>

                <strong>
                    ${industry.name.substring(
                        industry.name.indexOf(" ") + 1
                    )}
                </strong>

                <small>
                    ${industry.products.length}
                    ${productWord(
                        industry.products.length
                    )}
                </small>

            `;

            button.onclick = () =>
                chooseIndustry(key);

            container.appendChild(button);

        });
}


function chooseIndustry(industry) {

    selectedIndustry = industry;

    if (selectedMode === "sandbox") {

        selectedDifficulty = "sandbox";

        showScreen("companyScreen");

        return;
    }

    showScreen("difficultyScreen");

}


/* =====================================================
   DIFFICULTY
===================================================== */

function chooseDifficulty(difficulty) {

    selectedDifficulty = difficulty;

    showScreen("companyScreen");

}


/* =====================================================
   CREATE COMPANY
===================================================== */

function createCompany() {

    try {

        const input =
            document.getElementById(
                "companyName"
            );

        const message =
            document.getElementById(
                "companyMessage"
            );

        const name =
            input.value.trim();

        if (!name) {

            message.textContent =
                "⚠️ Zadaj názov firmy.";

            return;
        }

        if (!selectedIndustry) {

            message.textContent =
                "⚠️ Vyber najprv odvetvie.";

            return;
        }

        game =
            createDefaultGame();

        game.companyName =
            name;


        /* START MONEY */

        if (selectedDifficulty === "easy") {

            game.money = 12000;

        } else if (
            selectedDifficulty === "normal"
        ) {

            game.money = 10000;

        } else if (
            selectedDifficulty === "hard"
        ) {

            game.money = 8000;

        } else if (
            selectedDifficulty === "expert"
        ) {

            game.money = 6500;

        } else {

            game.money = Infinity;

        }


        /* PRODUCTS */

        const products =
            industries[
                selectedIndustry
            ].products;


        products.forEach(product => {

            game.inventory[
                product.id
            ] = 0;

            game.prices[
                product.id
            ] = product.sell;

            game.market[
                product.id
            ] = {

                demand:
                    product.demand,

                competition:
                    product.competition,

                trend: 0

            };

        });


        game.moneyHistory.push(
            Number.isFinite(game.money)
                ? game.money
                : 0
        );

        game.revenueHistory.push(0);


        generateCustomers();

        generateChallenges();

        generateEvent();


        showGame();


        saveGame();

    } catch (error) {

        console.error(
            "CREATE COMPANY ERROR:",
            error
        );

        const message =
            document.getElementById(
                "companyMessage"
            );

        if (message) {

            message.textContent =
                "❌ Chyba pri vytváraní firmy. Skontroluj konzolu.";

        }

    }

}


/* =====================================================
   SHOW GAME
===================================================== */

function showGame() {

    showScreen("gameScreen");

    const logout =
        document.getElementById(
            "logoutButton"
        );

    if (logout) {

        if (currentUser && !isGuest) {

            logout.classList.remove(
                "hidden"
            );

        } else {

            logout.classList.add(
                "hidden"
            );

        }

    }


    const guestWarning =
        document.getElementById(
            "guestWarning"
        );

    if (guestWarning) {

        guestWarning.classList.toggle(
            "hidden",
            !isGuest
        );

    }

    updateAll();

}


/* =====================================================
   PRODUCTS
===================================================== */

function getProduct(id) {

    if (!selectedIndustry) {
        return null;
    }

    return industries[
        selectedIndustry
    ].products.find(
        product =>
            product.id === id
    );
}


function renderProducts() {

    const container =
        document.getElementById(
            "productsContainer"
        );

    if (!container) return;

    const products =
        industries[
            selectedIndustry
        ].products;


    const countText =
        document.getElementById(
            "productCountText"
        );

    if (countText) {

        countText.textContent =
            `${products.length} ${
                productWord(products.length)
            }`;

    }


    container.innerHTML = "";


    products.forEach(product => {

        const price =
            game.prices[
                product.id
            ] ?? product.sell;

        const stock =
            game.inventory[
                product.id
            ] ?? 0;


        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <div class="product-info">

                🛒 Nákup:
                ${formatMoney(product.buy)}
                <br>

                💰 Predaj:
                ${formatMoney(price)}
                <br>

                📦 Sklad:
                ${stock} ks
                <br>

                📈 Dopyt:
                ${product.demand}/10
                <br>

                ⚔️ Konkurencia:
                ${product.competition}/10

            </div>

            <div class="price-row">

                <input
                    type="number"
                    min="1"
                    value="${price}"
                    onchange="
                        changePrice(
                            '${product.id}',
                            this.value
                        )
                    "
                >

                <button
                    class="primary-btn"
                    onclick="
                        buyProduct(
                            '${product.id}'
                        )
                    ">

                    Kúpiť 10 ks

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =====================================================
   CHANGE PRICE
===================================================== */

function changePrice(
    productId,
    value
) {

    const price =
        Number(value);

    if (!price || price <= 0) {
        return;
    }

    game.prices[
        productId
    ] = price;

    updateAll();

}


/* =====================================================
   BUY PRODUCT
===================================================== */

function buyProduct(productId) {

    const product =
        getProduct(productId);

    if (!product) return;

    const quantity = 10;

    const cost =
        product.buy *
        quantity;


    if (
        selectedDifficulty !== "sandbox" &&
        game.money < cost
    ) {

        alert(
            "Nemáš dosť peňazí."
        );

        return;
    }


    if (
        selectedDifficulty !== "sandbox"
    ) {

        game.money -= cost;

        game.costs += cost;

        game.todayCosts += cost;

    }


    game.inventory[
        productId
    ] =
        (game.inventory[
            productId
        ] || 0) + quantity;


    game.xp += 5;

    updateLevel();

    updateAll();

    saveGame();

}


/* =====================================================
   MARKETING
===================================================== */

function renderMarketing() {

    const container =
        document.getElementById(
            "marketingContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    Object.keys(
        marketingCampaigns
    ).forEach(key => {

        const campaign =
            marketingCampaigns[key];

        const card =
            document.createElement("div");

        card.className =
            "marketing-card";


        card.innerHTML = `

            <h3>
                ${campaign.name}
            </h3>

            <div class="product-info">

                💰 Cena:
                ${formatMoney(campaign.price)}
                <br>

                👥 Zákazníci:
                +${campaign.customers}
                <br>

                😊 Spokojnosť:
                +${campaign.satisfaction}

            </div>

            <button
                class="primary-btn"
                onclick="
                    runMarketing('${key}')
                ">

                Spustiť kampaň

            </button>

        `;

        container.appendChild(card);

    });

}


function runMarketing(key) {

    const campaign =
        marketingCampaigns[key];

    if (!campaign) return;


    if (
        selectedDifficulty !== "sandbox" &&
        game.money < campaign.price
    ) {

        alert(
            "Nemáš dosť peňazí."
        );

        return;
    }


    if (
        selectedDifficulty !== "sandbox"
    ) {

        game.money -=
            campaign.price;

        game.costs +=
            campaign.price;

        game.todayCosts +=
            campaign.price;

    }


    game.marketingBonus +=
        campaign.customers +
        game.employees.marketer * 5;


    game.marketingUsed++;


    game.customerSatisfaction =
        Math.min(
            100,
            game.customerSatisfaction +
            campaign.satisfaction
        );


    game.xp += 10;

    updateLevel();

    updateAll();

    saveGame();

}


/* =====================================================
   EMPLOYEES
===================================================== */

function renderEmployees() {

    const container =
        document.getElementById(
            "employeesContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    let total = 0;


    Object.keys(
        employeeTypes
    ).forEach(key => {

        const employee =
            employeeTypes[key];

        const count =
            game.employees[key] || 0;

        total += count;


        const card =
            document.createElement("div");

        card.className =
            "employee-card";


        card.innerHTML = `

            <h3>
                ${employee.name}
            </h3>

            <p>
                ${employee.description}
            </p>

            <div class="product-info">

                👥 Počet:
                ${count}
                <br>

                💰 Cena:
                ${formatMoney(
                    employee.price
                )}
                <br>

                📈 Bonus:
                +${employee.salesBonus}

            </div>

            <button
                class="primary-btn"
                onclick="
                    hireEmployee('${key}')
                ">

                Zamestnať

            </button>

        `;

        container.appendChild(card);

    });


    document.getElementById(
        "employeeTotal"
    ).textContent = total;

}


function hireEmployee(key) {

    const employee =
        employeeTypes[key];

    if (!employee) return;


    if (
        selectedDifficulty !== "sandbox" &&
        game.money < employee.price
    ) {

        alert(
            "Nemáš dosť peňazí."
        );

        return;
    }


    if (
        selectedDifficulty !== "sandbox"
    ) {

        game.money -=
            employee.price;

        game.costs +=
            employee.price;

        game.todayCosts +=
            employee.price;

    }


    game.employees[key]++;

    game.xp += 20;

    updateLevel();

    updateAll();

    saveGame();

}


/* =====================================================
   CUSTOMERS
===================================================== */

function generateCustomers() {

    let base = 20;


    if (
        selectedDifficulty === "easy"
    ) {
        base *= 1.2;
    }

    if (
        selectedDifficulty === "hard"
    ) {
        base *= .8;
    }

    if (
        selectedDifficulty === "expert"
    ) {
        base *= .65;
    }


    base += game.marketingBonus;


    base +=
        game.employees.salesperson * 2;

    base +=
        game.employees.manager * 3;

    base +=
        game.employees.warehouse;


    game.customersToday =
        Math.max(
            1,
            Math.floor(
                base +
                Math.random() * 10
            )
        );


    game.customerTypesToday = {};


    Object.keys(
        customerTypes
    ).forEach(type => {

        game.customerTypesToday[type] =
            Math.floor(
                game.customersToday / 4
            );

    });

}


function renderCustomers() {

    const todayCustomers =
        document.getElementById(
            "todayCustomers"
        );

    const todayBuyers =
        document.getElementById(
            "todayBuyers"
        );

    const satisfaction =
        document.getElementById(
            "customerSatisfaction"
        );


    if (todayCustomers) {

        todayCustomers.textContent =
            game.customersToday;

    }

    if (todayBuyers) {

        todayBuyers.textContent =
            game.buyersToday;

    }

    if (satisfaction) {

        satisfaction.textContent =
            `${Math.round(
                game.customerSatisfaction
            )} %`;

    }


    const container =
        document.getElementById(
            "customerTypesContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    Object.keys(
        customerTypes
    ).forEach(key => {

        const customer =
            customerTypes[key];

        const amount =
            game.customerTypesToday[key] ||
            0;


        const card =
            document.createElement("div");

        card.className =
            "customer-card";


        card.innerHTML = `

            <h3>
                ${customer.name}
            </h3>

            <p>
                ${customer.description}
            </p>

            <div class="product-info">

                👥 Dnes:
                ${amount}
                <br>

                💰 Rozpočet:
                ${formatMoney(
                    customer.budget
                )}
                <br>

                🏷️ Citlivosť:
                ${customer.priceSensitivity}

            </div>

        `;

        container.appendChild(card);

    });

}


/* =====================================================
   NEXT DAY
===================================================== */

function nextDay() {

    game.todayRevenue = 0;
    game.todayCosts = 0;
    game.todayProfit = 0;
    game.buyersToday = 0;


    sellProducts();

    payEmployees();


    game.totalProfit +=
        game.todayProfit;


    game.moneyHistory.push(
        Number.isFinite(game.money)
            ? game.money
            : 0
    );


    game.revenueHistory.push(
        game.todayRevenue
    );


    game.day++;


    game.marketingBonus = 0;

    game.marketingUsed = 0;


    generateMarket();

    generateCustomers();

    generateChallenges();

    generateEvent();


    game.xp += 10;

    updateLevel();

    updateAll();

    saveGame();

}


/* =====================================================
   SELL PRODUCTS
===================================================== */

function sellProducts() {

    const products =
        industries[
            selectedIndustry
        ].products;


    products.forEach(product => {

        let stock =
            game.inventory[
                product.id
            ] || 0;


        if (stock <= 0) {
            return;
        }


        const price =
            game.prices[
                product.id
            ] || product.sell;


        const market =
            game.market[
                product.id
            ];


        let potential =
            product.demand;


        potential +=
            game.employees.salesperson * 2;

        potential +=
            game.employees.manager * 3;

        potential +=
            game.employees.warehouse;


        potential +=
            game.marketingBonus /
            Math.max(
                1,
                products.length
            );


        potential -=
            product.competition * .3;


        const priceRatio =
            price /
            product.sell;


        if (priceRatio > 1) {

            potential -=
                (priceRatio - 1) * 8;

        }


        if (priceRatio < .9) {

            potential += 2;

        }


        if (market) {

            potential +=
                market.trend;

        }


        let sold =
            Math.floor(
                Math.random() *
                Math.max(
                    1,
                    potential + 2
                )
            );


        sold =
            Math.min(
                sold,
                stock
            );


        if (sold <= 0) {
            return;
        }


        const revenue =
            sold * price;

        const purchaseCost =
            sold * product.buy;


        game.inventory[
            product.id
        ] -= sold;


        game.todayRevenue +=
            revenue;

        game.revenue +=
            revenue;


        game.todayCosts +=
            purchaseCost;

        game.costs +=
            purchaseCost;


        game.todayProfit +=
            revenue -
            purchaseCost;


        game.totalUnitsSold +=
            sold;


        game.buyersToday +=
            sold;

        game.customers +=
            sold;


        game.xp +=
            sold;

    });


    if (
        selectedDifficulty === "sandbox"
    ) {

        game.money =
            Infinity;

    } else {

        game.money +=
            game.todayRevenue;

    }

}


/* =====================================================
   EMPLOYEE COSTS
===================================================== */

function payEmployees() {

    if (
        selectedDifficulty === "sandbox"
    ) {
        return;
    }


    const totalEmployees =
        Object.values(
            game.employees
        )
        .reduce(
            (sum, value) =>
                sum + value,
            0
        );


    const cost =
        totalEmployees * 50;


    game.money -= cost;

    game.costs += cost;

    game.todayCosts += cost;

    game.todayProfit -= cost;

}


/* =====================================================
   MARKET
===================================================== */

function generateMarket() {

    if (!selectedIndustry) return;


    industries[
        selectedIndustry
    ].products.forEach(product => {

        const trend =
            Math.floor(
                Math.random() * 7
            ) - 3;


        game.market[
            product.id
        ] = {

            demand:
                Math.max(
                    1,
                    Math.min(
                        10,
                        product.demand +
                        trend
                    )
                ),

            competition:
                Math.max(
                    1,
                    Math.min(
                        10,
                        product.competition +
                        Math.floor(
                            Math.random() * 5
                        ) - 2
                    )
                ),

            trend

        };

    });


    const news = [

        "📈 Dopyt po niektorých produktoch rastie.",

        "📉 Konkurencia dnes znižuje ceny.",

        "🔥 Na trhu vznikol nový trend.",

        "💰 Zákazníci dnes viac sledujú ceny.",

        "🛍️ Spotrebitelia dnes viac nakupujú.",

        "⚔️ Na trhu pribudla konkurencia."

    ];


    document.getElementById(
        "marketNewsText"
    ).textContent =
        news[
            Math.floor(
                Math.random() *
                news.length
            )
        ];

}


function renderMarket() {

    const container =
        document.getElementById(
            "marketContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    industries[
        selectedIndustry
    ].products.forEach(product => {

        const market =
            game.market[
                product.id
            ];


        const card =
            document.createElement("div");

        card.className =
            "market-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <div class="product-info">

                📈 Dopyt:
                ${market?.demand ??
                product.demand}/10

                <br>

                ⚔️ Konkurencia:
                ${market?.competition ??
                product.competition}/10

                <br>

                📊 Trend:
                ${
                    market?.trend > 0
                    ? "📈 Rast"
                    : market?.trend < 0
                    ? "📉 Pokles"
                    : "➡️ Stabilný"
                }

            </div>

        `;

        container.appendChild(card);

    });

}


/* =====================================================
   EVENTS
===================================================== */

function generateEvent() {

    if (Math.random() > .45) {

        game.currentEvent = null;
        game.eventActive = false;

        return;
    }


    const events = [

        {
            text:
                "📢 O tvojej firme sa začalo hovoriť na sociálnych sieťach.",

            choices: [

                {
                    text:
                        "Využiť situáciu",

                    action: () => {

                        game.marketingBonus += 30;
                        game.xp += 20;

                    }
                },

                {
                    text:
                        "Ignorovať",

                    action: () => {}
                }

            ]
        },


        {
            text:
                "📦 Dodávateľ ponúka veľkú zľavu.",

            choices: [

                {
                    text:
                        "Nakúpiť viac",

                    action: () => {

                        game.customerSatisfaction += 2;
                        game.xp += 15;

                    }
                },

                {
                    text:
                        "Odmietnuť",

                    action: () => {}
                }

            ]
        },


        {
            text:
                "⚔️ Konkurent dočasne znížil ceny.",

            choices: [

                {
                    text:
                        "Znížiť ceny",

                    action: () => {

                        Object.keys(
                            game.prices
                        ).forEach(id => {

                            game.prices[id] *= .9;

                        });

                        game.customerSatisfaction += 3;

                    }
                },

                {
                    text:
                        "Nechať ceny",

                    action: () => {

                        game.customerSatisfaction -= 1;

                    }
                }

            ]
        }

    ];


    game.currentEvent =
        events[
            Math.floor(
                Math.random() *
                events.length
            )
        ];


    game.eventActive = true;
    game.eventUsed = false;

}


function renderEvent() {

    const text =
        document.getElementById(
            "eventText"
        );

    const choices =
        document.getElementById(
            "eventChoices"
        );


    if (!text || !choices) return;


    choices.innerHTML = "";


    if (
        !game.currentEvent ||
        game.eventUsed
    ) {

        text.textContent =
            game.eventUsed
            ? "Dnešná udalosť bola vyriešená."
            : "Dnes sa zatiaľ nič zvláštne nestalo.";

        return;
    }


    text.textContent =
        game.currentEvent.text;


    game.currentEvent.choices
        .forEach(
            (choice,index) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.className =
                    "secondary-btn";

                button.style.margin =
                    "5px";

                button.textContent =
                    choice.text;

                button.onclick =
                    () =>
                        useEventChoice(index);

                choices.appendChild(
                    button
                );

            }
        );

}


function useEventChoice(index) {

    if (
        !game.currentEvent ||
        game.eventUsed
    ) {
        return;
    }


    const choice =
        game.currentEvent
            .choices[index];


    if (!choice) return;


    choice.action();


    game.eventUsed = true;
    game.eventActive = false;


    updateAll();

    saveGame();

}


/* =====================================================
   CHALLENGES
===================================================== */

function generateChallenges() {

    game.dailyChallenge = {

        text:
            "Predaj dnes aspoň 5 kusov.",

        target: 5,

        progress:
            Math.min(
                game.buyersToday,
                5
            ),

        reward: 100,

        completed:
            game.buyersToday >= 5

    };


    game.weeklyChallenge = {

        text:
            "Predaj celkovo aspoň 50 kusov.",

        target: 50,

        progress:
            Math.min(
                game.totalUnitsSold,
                50
            ),

        reward: 500,

        completed:
            game.totalUnitsSold >= 50

    };

}


function renderChallenges() {

    const daily =
        document.getElementById(
            "dailyChallenge"
        );

    const weekly =
        document.getElementById(
            "weeklyChallenge"
        );


    if (
        daily &&
        game.dailyChallenge
    ) {

        daily.innerHTML = `

            <p>
                ${game.dailyChallenge.text}
            </p>

            <br>

            <strong>
                ${game.dailyChallenge.progress}
                /
                ${game.dailyChallenge.target}
            </strong>

            <br><br>

            Odmena:
            ${formatMoney(
                game.dailyChallenge.reward
            )}

            ${
                game.dailyChallenge.completed
                ? " 🟢 Splnené"
                : ""
            }

        `;

    }


    if (
        weekly &&
        game.weeklyChallenge
    ) {

        weekly.innerHTML = `

            <p>
                ${game.weeklyChallenge.text}
            </p>

            <br>

            <strong>
                ${game.weeklyChallenge.progress}
                /
                ${game.weeklyChallenge.target}
            </strong>

            <br><br>

            Odmena:
            ${formatMoney(
                game.weeklyChallenge.reward
            )}

            ${
                game.weeklyChallenge.completed
                ? " 🟢 Splnené"
                : ""
            }

        `;

    }

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

const achievementList = [

    {
        id: "first_sale",

        name: "🛒 Prvý predaj",

        description:
            "Predaj prvý kus.",

        condition:
            () =>
                game.totalUnitsSold >= 1
    },


    {
        id: "ten_sales",

        name: "🔥 Rozbehnutý podnik",

        description:
            "Predaj 10 kusov.",

        condition:
            () =>
                game.totalUnitsSold >= 10
    },


    {
        id: "hundred_sales",

        name: "💯 Stovka",

        description:
            "Predaj 100 kusov.",

        condition:
            () =>
                game.totalUnitsSold >= 100
    },


    {
        id: "employee",

        name: "👔 Šéf",

        description:
            "Zamestnaj prvého človeka.",

        condition:
            () =>
                Object.values(
                    game.employees
                ).some(
                    value => value > 0
                )
    },


    {
        id: "marketing",

        name: "📢 Marketér",

        description:
            "Spusť marketing.",

        condition:
            () =>
                game.marketingUsed >= 1
    },


    {
        id: "level5",

        name: "⭐ Skúsený podnikateľ",

        description:
            "Dosiahni level 5.",

        condition:
            () =>
                game.level >= 5
    }

];


function updateAchievements() {

    achievementList.forEach(
        achievement => {

            if (
                achievement.condition() &&
                !game.achievements
                    .includes(
                        achievement.id
                    )
            ) {

                game.achievements.push(
                    achievement.id
                );

            }

        }
    );

}


function renderAchievements() {

    const container =
        document.getElementById(
            "achievementsContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    achievementList.forEach(
        achievement => {

            const unlocked =
                game.achievements
                    .includes(
                        achievement.id
                    );


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "achievement-card";


            card.innerHTML = `

                <h3>
                    ${
                        unlocked
                        ? "🏆"
                        : "🔒"
                    }

                    ${achievement.name}

                </h3>

                <p>
                    ${achievement.description}
                </p>

            `;

            container.appendChild(card);

        }
    );

}


/* =====================================================
   LEVEL
===================================================== */

function updateLevel() {

    game.level =
        Math.floor(
            game.xp / 100
        ) + 1;

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const setText =
        (id,value) => {

            const element =
                document.getElementById(id);

            if (element) {
                element.textContent =
                    value;
            }

        };


    setText(
        "companyTitle",
        game.companyName
    );

    setText(
        "money",
        formatMoney(game.money)
    );

    setText(
        "day",
        game.day
    );

    setText(
        "level",
        game.level
    );

    setText(
        "dashboardIndustry",
        industries[
            selectedIndustry
        ]?.name || ""
    );

    setText(
        "dashboardDifficulty",
        difficultyName(
            selectedDifficulty
        )
    );

    setText(
        "dashboardMoney",
        formatMoney(game.money)
    );

    setText(
        "dashboardRevenue",
        formatMoney(game.revenue)
    );

    setText(
        "dashboardCosts",
        formatMoney(game.costs)
    );

    setText(
        "dashboardProfit",
        formatMoney(game.totalProfit)
    );

    setText(
        "dashboardCustomers",
        game.customers
    );

    setText(
        "dashboardSatisfaction",
        `${Math.round(
            game.customerSatisfaction
        )} %`
    );

    setText(
        "dashboardXP",
        game.xp
    );


    const summary =
        document.getElementById(
            "dailySummary"
        );

    if (summary) {

        summary.innerHTML = `

            💰 Tržby:
            <strong>
                ${formatMoney(
                    game.todayRevenue
                )}
            </strong>

            <br>

            💸 Náklady:
            <strong>
                ${formatMoney(
                    game.todayCosts
                )}
            </strong>

            <br>

            📈 Zisk:
            <strong>
                ${formatMoney(
                    game.todayProfit
                )}
            </strong>

            <br>

            🛒 Predané kusy:
            <strong>
                ${game.buyersToday}
            </strong>

        `;

    }

}


/* =====================================================
   PANELS
===================================================== */

function showPanel(panel) {

    document
        .querySelectorAll(".game-panel")
        .forEach(
            element =>
                element.classList.remove(
                    "active"
                )
        );


    const selected =
        document.getElementById(
            panel
        );


    if (selected) {
        selected.classList.add(
            "active"
        );
    }


    updateAll();

}


/* =====================================================
   SAVE
===================================================== */

function serializeGame() {

    return JSON.stringify(
        game,

        (key,value) => {

            if (
                value === Infinity
            ) {
                return "INFINITY";
            }

            if (
                typeof value === "function"
            ) {
                return undefined;
            }

            if (
                key === "currentEvent"
            ) {
                return null;
            }

            return value;
        }
    );

}


function deserializeGame(data) {

    return JSON.parse(
        data,

        (key,value) => {

            if (
                value === "INFINITY"
            ) {
                return Infinity;
            }

            return value;

        }
    );

}


function setSaveStatus(text) {

    const element =
        document.getElementById(
            "saveStatus"
        );

    if (element) {
        element.textContent =
            text;
    }

}


async function saveGame() {

    if (
        isGuest ||
        !currentUser
    ) {

        setSaveStatus(
            "👤 Hosť – progres sa neukladá"
        );

        return false;
    }


    setSaveStatus(
        "💾 Ukladám..."
    );


    const { error } =
        await supabaseClient
            .from("game_saves")
            .upsert({

                user_id:
                    currentUser.id,

                game_state: {

                    game:
                        serializeGame(),

                    mode:
                        selectedMode,

                    industry:
                        selectedIndustry,

                    difficulty:
                        selectedDifficulty

                },

                updated_at:
                    new Date().toISOString()

            });


    if (error) {

        console.error(error);

        setSaveStatus(
            "⚠️ Uloženie zlyhalo"
        );

        return false;
    }


    setSaveStatus(
        "💾 Uložené"
    );

    return true;

}


/* =====================================================
   LOAD SAVE
===================================================== */

async function findSavedGame() {

    if (!currentUser) {
        return null;
    }


    const { data,error } =
        await supabaseClient
            .from("game_saves")
            .select("*")
            .eq(
                "user_id",
                currentUser.id
            )
            .maybeSingle();


    if (error) {

        console.error(error);

        return null;
    }


    return data;

}


/* =====================================================
   REGISTER
===================================================== */

async function registerAccount() {

    const email =
        document.getElementById(
            "authEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "authPassword"
        ).value;

    const message =
        document.getElementById(
            "authMessage"
        );


    if (!email || !password) {

        message.textContent =
            "⚠️ Vyplň e-mail a heslo.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "⚠️ Heslo musí mať aspoň 6 znakov.";

        return;
    }


    message.textContent =
        "⏳ Vytváram účet...";


    const { error } =
        await supabaseClient.auth.signUp({

            email,
            password

        });


    if (error) {

        message.textContent =
            "❌ " + error.message;

        return;
    }


    message.textContent =
        "✅ Účet bol vytvorený. Teraz sa prihlás.";

}


/* =====================================================
   LOGIN
===================================================== */

async function loginAccount() {

    const email =
        document.getElementById(
            "authEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "authPassword"
        ).value;

    const message =
        document.getElementById(
            "authMessage"
        );


    if (!email || !password) {

        message.textContent =
            "⚠️ Vyplň e-mail a heslo.";

        return;
    }


    message.textContent =
        "⏳ Prihlasujem...";


    const { data,error } =
        await supabaseClient.auth
            .signInWithPassword({

                email,
                password

            });


    if (error) {

        message.textContent =
            "❌ " + error.message;

        return;
    }


    currentUser =
        data.user;

    isGuest = false;


    await afterLogin();

}


/* =====================================================
   AFTER LOGIN
===================================================== */

async function afterLogin() {

    const save =
        await findSavedGame();


    if (
        save &&
        save.game_state
    ) {

        savedGameData =
            save.game_state;


        const loaded =
            deserializeGame(
                save.game_state.game
            );


        document.getElementById(
            "saveInfo"
        ).innerHTML = `

            🏢 Firma:
            <strong>
                ${loaded.companyName}
            </strong>

            <br>

            📅 Deň:
            <strong>
                ${loaded.day}
            </strong>

            <br>

            💰 Peniaze:
            <strong>
                ${formatMoney(
                    loaded.money
                )}
            </strong>

        `;


        showScreen(
            "continueScreen"
        );

    } else {

        startNewGame();

    }

}


/* =====================================================
   CONTINUE
===================================================== */

async function continueSavedGame() {

    if (!savedGameData) {

        startNewGame();

        return;
    }


    game =
        deserializeGame(
            savedGameData.game
        );


    selectedMode =
        savedGameData.mode;

    selectedIndustry =
        savedGameData.industry;

    selectedDifficulty =
        savedGameData.difficulty;


    game.currentEvent = null;


    generateCustomers();

    generateChallenges();

    generateEvent();


    isGuest = false;


    showGame();

}


/* =====================================================
   NEW GAME
===================================================== */

function startNewGame() {

    game =
        createDefaultGame();

    savedGameData = null;

    showScreen(
        "modeScreen"
    );

}


/* =====================================================
   GUEST
===================================================== */

function playAsGuest() {

    currentUser = null;

    isGuest = true;

    game =
        createDefaultGame();

    selectedMode = null;
    selectedIndustry = null;
    selectedDifficulty = null;


    showScreen(
        "modeScreen"
    );

}


/* =====================================================
   LOGOUT
===================================================== */

async function logoutUser() {

    if (
        currentUser &&
        !isGuest
    ) {

        await saveGame();

        await supabaseClient
            .auth
            .signOut();

    }


    currentUser = null;

    isGuest = false;

    game =
        createDefaultGame();


    document
        .getElementById(
            "logoutButton"
        )
        ?.classList.add(
            "hidden"
        );


    showScreen(
        "startScreen"
    );

}


/* =====================================================
   CHARTS
===================================================== */

function drawCharts() {

    drawChart(
        "moneyChart",
        game.moneyHistory
    );

    drawChart(
        "revenueChart",
        game.revenueHistory
    );

}


function drawChart(id, values) {

    const canvas =
        document.getElementById(id);

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    const width =
        canvas.width =
            canvas.clientWidth * 2;


    const height =
        canvas.height = 300;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    if (
        !values ||
        !values.length
    ) {
        return;
    }


    const clean =
        values.map(
            value =>
                Number.isFinite(value)
                    ? value
                    : 0
        );


    const max =
        Math.max(
            ...clean,
            1
        );


    ctx.beginPath();


    clean.forEach(
        (value,index) => {

            const x =
                (
                    index /
                    Math.max(
                        1,
                        clean.length - 1
                    )
                ) *
                width;


            const y =
                height -
                (
                    value /
                    max
                ) *
                (
                    height - 30
                ) -
                10;


            if (index === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.strokeStyle =
        "#3b82f6";

    ctx.lineWidth = 5;

    ctx.stroke();

}


/* =====================================================
   HELPERS
===================================================== */

function formatMoney(value) {

    if (
        value === Infinity
    ) {
        return "∞ €";
    }


    return new Intl.NumberFormat(
        "sk-SK",
        {

            style: "currency",

            currency: "EUR",

            maximumFractionDigits: 0

        }
    ).format(
        value || 0
    );

}


function productWord(number) {

    const n =
        Math.abs(
            Number(number)
        );


    if (n === 1) {
        return "produkt";
    }


    if (
        n >= 2 &&
        n <= 4
    ) {
        return "produkty";
    }


    return "produktov";

}


function difficultyName(
    difficulty
) {

    const names = {

        easy: "Ľahká",

        normal: "Normálna",

        hard: "Ťažká",

        expert: "Expert",

        sandbox: "Sandbox"

    };


    return (
        names[difficulty] ||
        "Normálna"
    );

}


/* =====================================================
   UPDATE
===================================================== */

function updateAll() {

    if (!selectedIndustry) {
        return;
    }


    if (
        selectedDifficulty === "sandbox"
    ) {

        game.money =
            Infinity;

    }


    updateAchievements();

    updateDashboard();

    renderProducts();

    renderMarket();

    renderMarketing();

    renderCustomers();

    renderEmployees();

    renderChallenges();

    renderAchievements();

    renderEvent();

    drawCharts();

}


/* =====================================================
   SUPABASE AUTH INIT
===================================================== */

async function initAuth() {

    const {
        data
    } =
        await supabaseClient
            .auth
            .getSession();


    if (data.session) {

        currentUser =
            data.session.user;

        isGuest = false;

    }


    supabaseClient.auth
        .onAuthStateChange(
            (_event,session) => {

                currentUser =
                    session?.user ||
                    null;

                if (!session) {

                    isGuest =
                        false;

                }

            }
        );

}


initAuth();


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.startGame =
    startGame;

window.registerAccount =
    registerAccount;

window.loginAccount =
    loginAccount;

window.playAsGuest =
    playAsGuest;

window.startNewGame =
    startNewGame;

window.continueSavedGame =
    continueSavedGame;

window.chooseMode =
    chooseMode;

window.chooseIndustry =
    chooseIndustry;

window.chooseDifficulty =
    chooseDifficulty;

window.createCompany =
    createCompany;

window.showPanel =
    showPanel;

window.changePrice =
    changePrice;

window.buyProduct =
    buyProduct;

window.runMarketing =
    runMarketing;

window.hireEmployee =
    hireEmployee;

window.nextDay =
    nextDay;

window.useEventChoice =
    useEventChoice;

window.saveGame =
    saveGame;

window.logoutUser =
    logoutUser;

window.loginUser =
    loginAccount;

window.registerUser =
    registerAccount;

window.logout =
    logoutUser;
