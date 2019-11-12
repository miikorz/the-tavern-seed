export const cleanLabel = (label) => {
    label = label.replace(/-Infinity/g, '0');
    label = label.replace(/Infinity/g, '∞');
    label = label.replace(/_/g, ' ');
    label = label.replace(/false/g, 'No');
    label = label.replace(/true/g, 'Sí');
    return label ? label.charAt(0).toUpperCase() + (label.slice(1)).toLowerCase() : '';
};
