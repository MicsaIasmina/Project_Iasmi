const categories = [
  {
    name: "Străzi",
    subCategories: [
      "Trotuar deteriorat",
      "Drum deteriorat",
      "Capac canalizare lipsă",
    ],
    icon: require("../Images/intersection.png"),
    pinColor: "#32314b",
  },

  {
    name: "Iluminat",
    subCategories: [
      "Iluminat public defect sau lipsă",
      "Stâlp căzut sau cu risc",
      "Cabluri deteriorate sau căzute",
      "Altele-Iluminat",
    ],
    icon: require("../Images/street-lamp-3.png"),
    pinColor: "#d5a40f",
  },

  {
    name: "Salubritate",
    subCategories: [
      "Strada murdara",
      "Deseuri abandonate",
      "Pubele neridicate",
    ],
    icon: require("../Images/dump.png"),
    pinColor: "#aad7e4",
  },
  {
    name: "Vandalism",
    subCategories: [
      "Locuri de joaca",
      "Grafitii",
      "Stalpi de iluminat",
      "Banci",
    ],
    icon: require("../Images/graffiti.png"),
    pinColor: "#e61b62",
  },
  {
    name: "Trafic auto,semne de circulație și parcări",
    subCategories: [
      "Semne de circulație lipsă sau deteriorate",
      "Semafor defect",
      "Indicator poziționat greșit",
      "Parcare neregulamentară",
      "Vehicul abandonat",
      "Altele-Trafic auto",
    ],
    icon: require("../Images/automobile.png"),
    pinColor: "#a6abbb",
  },
  {
    name: "Parcuri și spații verzi",
    subCategories: [
      "Spațiu verde neîngrijit",
      "Copac cu risc de prăbușire",
      "Alee murdară",
      "Lipsă iluminat",
      "Loc de joacă deteriorat",
      "Bănci deteriorate",
      "Altele-Spații verzi",
    ],
    icon: require("../Images/park-2.png"),
    pinColor: "#c2cd7c",
  },
  {
    name: "Construcții",
    subCategories: [
      "Lucrări de construcții fără panou de șantier",
      "Construcție periculoasă sau cu risc",
      "Altele-Construcții",
    ],
    icon: require("../Images/crane.png"),
    pinColor: "#fccc54",
  },
  {
    name: "Angajați în serviciul public",
    subCategories: [
      "Neîndeplinirea atribuțiilor de serviciu",
      "Personal-comportament neadecvat",
      "Altele-Angajați în serviciul public",
    ],
    icon: require("../Images/businessman.png"),
    pinColor: "#246399",
  },
  {
    name: "Transport în comun",
    subCategories: [
      "Autobuz-Comportament necivilizat",
      "Autobuz-Altele",
      "Taxi-Condiții necorespunzătoare",
      "Taxi-Comportament necivilizat",
      "Taxi-Lipsa tarifului afișat",
      "Altele-Transport în comun",
    ],
    icon: require("../Images/tram.png"),
    pinColor: "#f25948",
  },
  {
    name: "Animale în domeniul public",
    subCategories: [
      "Câine fără stăpân",
      "Animal mort abandonat",
      "Altele-Animale pe domeniul public",
    ],
    icon: require("../Images/dog.png"),
    pinColor: "#eba353",
  },
  {
    name: "Utilități",
    subCategories: [
      "Capac lipsă(canalizare,telecomunicații,etc)",
      "Defecte(țevi sparte,branșament gaz,canalizare,hidranți,etc)",
      "Altele-Utilități",
    ],
    icon: require("../Images/water-tap.png"),
    pinColor: "#5a575d",
  },
  {
    name: "Fumatul în spații interzise",
    subCategories: [
      "Transport public",
      "Loc de joacă",
      "Instituție sanitară",
      "Instituție de învățământ",
      "Altele-Fumat în spații interzise",
    ],
    icon: require("../Images/cigarrete.png"),
    pinColor: "#fb9353",
  },
  {
    name: "Diverse",
    subCategories: ["Diverse"],
    icon: require("../Images/settings.png"),
    pinColor: "#349c8c",
  },
];

const getColorByCategory = (name) => {
  const category = categories.find((x) => x.name === name);
  return category.pinColor;
};

export default categories;

export const getIconByCategoryName = (categoryName) => {
  const category = categories.find((x) => x.name === categoryName);
  return category.icon;
};

export const categoriesNames = categories.map((c) => c.name);

export const getColorByStatus = (status, categoryName = null) => {
  switch (status) {
    case "DONE": {
      return "green";
    }
    default: {
      if (categoryName) return getColorByCategory(categoryName);
      return "red";
    }
  }
};
