'use strict';

module.exports = {
    data: [
        {
            "tax_rate_id": 1,
            "tax_rate_name": 'IVA',
            "tax_rate_percent": '16.00',
            "tax_type": "T",
            "tax_name": "IVA"
        },
        {
            "tax_rate_id": 2,
            "tax_rate_name": 'IEPS',
            "tax_rate_percent": '8.00',
            "tax_type": "T",
            "tax_name": "IEPS"
        },
        {
            "tax_rate_id": 3,
            "tax_rate_name": 'IVA',
            "tax_rate_percent": '0.00',
            "tax_type": "T",
            "tax_name": "IVA TASA CERO"
        },
        {
            "tax_rate_id": 4,
            "tax_rate_name": 'IVA',
            "tax_rate_percent": '-10.6666',
            "tax_type": "R",
            "tax_name": "RETENCION IVA"
        },
        {
            "tax_rate_id": 5,
            "tax_rate_name": 'ISR',
            "tax_rate_percent": '-10.00',
            "tax_type": "R",
            "tax_name": "RETENCION ISR"
        },
        {
            "tax_rate_id": 6,
            "tax_rate_name": 'ISH',
            "tax_rate_percent": '3.00',
            "tax_type": "TL",
            "tax_name": "ISH"
        },

    ],
    // the root RESTful resource URL
    rootUrl: '/api/taxes',
    idProperty: 'id',
    // Optionally give it a delay (in milliseconds) to simulate network latency
    // as you'd have in real clientapp situation.
    delay: 200
};