import { formatCurrency } from '../../scripts/utilities/calculate_cash.js';


if (formatCurrency(1734) === '1734') {
    console.log('passed');
} else {
    console.log('failed');
}


if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

if (formatCurrency(2000.5) === '3,468,867') {
    console.log('passed');
} else {
    console.log('failed mofo');
}