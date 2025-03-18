
export const CityOptions = () => {
  const topCitiesInIndia = [
    { name: "Delhi", stateCode: "DL" },
    { name: "Chandigarh", stateCode: "CH" },
    { name: "Visakhapatnam", stateCode: "AP" },
    { name: "Vijayawada", stateCode: "AP" },
    { name: "Guntur", stateCode: "AP" },

    { name: "Itanagar", stateCode: "AR" },
    { name: "Naharlagun", stateCode: "AR" },

    { name: "Guwahati", stateCode: "AS" },
    { name: "Dibrugarh", stateCode: "AS" },
    { name: "Silchar", stateCode: "AS" },

    { name: "Patna", stateCode: "BR" },
    { name: "Gaya", stateCode: "BR" },
    { name: "Muzaffarpur", stateCode: "BR" },

    { name: "Raipur", stateCode: "CG" },
    { name: "Bhilai", stateCode: "CG" },
    { name: "Bilaspur", stateCode: "CG" },

    { name: "Panaji", stateCode: "GA" },
    { name: "Margao", stateCode: "GA" },

    { name: "Ahmedabad", stateCode: "GJ" },
    { name: "Surat", stateCode: "GJ" },
    { name: "Vadodara", stateCode: "GJ" },

    { name: "Gurugram", stateCode: "HR" },
    { name: "Faridabad", stateCode: "HR" },
    { name: "Panipat", stateCode: "HR" },

    { name: "Shimla", stateCode: "HP" },
    { name: "Dharamshala", stateCode: "HP" },
    { name: "Solan", stateCode: "HP" },

    { name: "Ranchi", stateCode: "JH" },
    { name: "Jamshedpur", stateCode: "JH" },
    { name: "Dhanbad", stateCode: "JH" },

    { name: "Bangalore", stateCode: "KA" },
    { name: "Mysore", stateCode: "KA" },
    { name: "Hubli", stateCode: "KA" },

    { name: "Thiruvananthapuram", stateCode: "KL" },
    { name: "Kochi", stateCode: "KL" },
    { name: "Kozhikode", stateCode: "KL" },

    { name: "Indore", stateCode: "MP" },
    { name: "Bhopal", stateCode: "MP" },
    { name: "Jabalpur", stateCode: "MP" },

    { name: "Mumbai", stateCode: "MH" },
    { name: "Pune", stateCode: "MH" },
    { name: "Nagpur", stateCode: "MH" },

    { name: "Imphal", stateCode: "MN" },
    { name: "Thoubal", stateCode: "MN" },

    { name: "Shillong", stateCode: "ML" },
    { name: "Tura", stateCode: "ML" },

    { name: "Aizawl", stateCode: "MZ" },
    { name: "Lunglei", stateCode: "MZ" },

    { name: "Kohima", stateCode: "NL" },
    { name: "Dimapur", stateCode: "NL" },

    { name: "Bhubaneswar", stateCode: "OD" },
    { name: "Cuttack", stateCode: "OD" },
    { name: "Rourkela", stateCode: "OD" },

    { name: "Ludhiana", stateCode: "PB" },
    { name: "Amritsar", stateCode: "PB" },
    { name: "Jalandhar", stateCode: "PB" },

    { name: "Jaipur", stateCode: "RJ" },
    { name: "Jodhpur", stateCode: "RJ" },
    { name: "Udaipur", stateCode: "RJ" },

    { name: "Gangtok", stateCode: "SK" },
    { name: "Namchi", stateCode: "SK" },

    { name: "Chennai", stateCode: "TN" },
    { name: "Coimbatore", stateCode: "TN" },
    { name: "Madurai", stateCode: "TN" },

    { name: "Hyderabad", stateCode: "TS" },
    { name: "Warangal", stateCode: "TS" },
    { name: "Karimnagar", stateCode: "TS" },

    { name: "Agartala", stateCode: "TR" },
    { name: "Udaipur", stateCode: "TR" },

    { name: "Lucknow", stateCode: "UP" },
    { name: "Kanpur", stateCode: "UP" },
    { name: "Varanasi", stateCode: "UP" },

    { name: "Dehradun", stateCode: "UK" },
    { name: "Haridwar", stateCode: "UK" },
    { name: "Haldwani", stateCode: "UK" },

    { name: "Kolkata", stateCode: "WB" },
    { name: "Howrah", stateCode: "WB" },
    { name: "Durgapur", stateCode: "WB" },
  ];

  return topCitiesInIndia.sort((a, b) => a.name.localeCompare(b.name)).map((city) => ({
    value: city.name.toLowerCase(),
    label: `${city.name} ${city.stateCode}`, // IN is the country code for India
  }));
};