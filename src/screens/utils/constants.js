export const STATE_LIST = {
    "AN":"Andaman and Nicobar Islands",
    "AP":"Andhra Pradesh",
    "AR":"Arunachal Pradesh",
    "AS":"Assam",
    "BR":"Bihar",
    "CG":"Chandigarh",
    "CH":"Chhattisgarh",
    "DN":"Dadra and Nagar Haveli",
    "DD":"Daman and Diu",
    "DL":"Delhi",
    "GA":"Goa",
    "GJ":"Gujarat",
    "HR":"Haryana",
    "HP":"Himachal Pradesh",
    "JK":"Jammu and Kashmir",
    "JH":"Jharkhand",
    "KA":"Karnataka",
    "KL":"Kerala",
    "LA":"Ladakh",
    "LD":"Lakshadweep",
    "MP":"Madhya Pradesh",
    "MH":"Maharashtra",
    "MN":"Manipur",
    "ML":"Meghalaya",
    "MZ":"Mizoram",
    "NL":"Nagaland",
    "OR":"Odisha",
    "PY":"Puducherry",
    "PB":"Punjab",
    "RJ":"Rajasthan",
    "SK":"Sikkim",
    "TN":"Tamil Nadu",
    "TS":"Telangana",
    "TR":"Tripura",
    "UP":"Uttar Pradesh",
    "UK":"Uttarakhand",
    "WB":"West Bengal"
}

export const SORT_BY_LIST = [
    'Confirmed Count: Low to High',
    'Confirmed Count: High to Low',
    'Affected Percentage: Low to High',
    'Affected Percentage: High to Low',
    'Vaccinated Percentage: Low to High',
    'Vaccinated Percentage: High to Low',
]

export const SORT_FILTER = {
    'Confirmed Count: Low to High' : {
        key: 'confirmedCount',
        order: 0,
    },
    'Confirmed Count: High to Low' : {
        key: 'confirmedCount',
        order: 1,
    },
    'Affected Percentage: Low to High' : {
        key: 'affectedPercentage',
        order: 0,
    },
    'Affected Percentage: High to Low' : {
        key: 'affectedPercentage',
        order: 1,
    },
    'Vaccinated Percentage: Low to High' : {
        key: 'vaccinatedPercentage',
        order: 0,
    },
    'Vaccinated Percentage: High to Low' : {
        key: 'vaccinatedPercentage',
        order: 1,
    },
}

export const NO_RESULTS_FOUND = 'No Results Found';
export const NO_DATA_FOUND = 0;
export const ERROR_MESSAGE = 'Something went wrong. please try again!';

export const HOME_SEARCH_LOCAL_KEY = 'HOME_SEARCH_LOCAL_KEY';
export const HOME_SORTBY_LOCAL_KEY = 'HOME_SORTBY_LOCAL_KEY';
export const HOME_DATE_LOCAL_KEY = 'HOME_DATE_LOCAL_KEY';
export const DETAIL_SORTBY_LOCAL_KEY = 'DETAIL_SORTBY_LOCAL_KEY';
export const DETAIL_DATE_LOCAL_KEY = 'DETAIL_DATE_LOCAL_KEY';
