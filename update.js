 
const fs = require('fs');
const content = fs.readFileSync('components/sections/Travel.tsx', 'utf8');
const map1 = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Vadodara+Airport+BDQ+to+Parul+University&t=&z=13&ie=UTF8&iwloc=B&output=embed";
const map2 = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Vadodara+Junction+BRC+to+Parul+University&t=&z=13&ie=UTF8&iwloc=B&output=embed";
const map3 = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Parul+University+Vadodara&t=&z=14&ie=UTF8&iwloc=B&output=embed";

let updated = content.replace(
    /setMapSrc\("https:\/\/maps\.google\.com\/maps\?saddr=Vadodara\+Airport\+BDQ&daddr=Parul\+University\+Vadodara&output=embed"\)/,
    `setMapSrc("${map1}")`
);

updated = updated.replace(
    /setMapSrc\("https:\/\/maps\.google\.com\/maps\?saddr=Vadodara\+Junction\+BRC&daddr=Parul\+University\+Vadodara&output=embed"\)/,
    `setMapSrc("${map2}")`
);

updated = updated.replace(
    /setMapSrc\("https:\/\/maps\.google\.com\/maps\?q=Parul\+University\+Vadodara&t=&z=14&ie=UTF8&output=embed"\)/,
    `setMapSrc("${map3}")`
);

fs.writeFileSync('components/sections/Travel.tsx', updated);
