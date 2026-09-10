function kreirajPitanja() {
    return [{
        pitanje: 'Kojom ključnom rječju definiramo varijablu čiju vrijednost možemo mijenjati?',
        tocno: 'let',
        odgovori: ['const', 'let', 'var','prazno']
    },
    {
        pitanje: 'Koji je index prvog elementa u nizu?',
        tocno: '0',
        odgovori: ['1', '0', '-1','prazno']
    },
    {
        pitanje: 'Kako provjeravamo koliko elemenata ima u nizu \'niz\'?',
        tocno: 'niz.length',
        odgovori: ['niz.size', 'niz.count', 'niz.length','prazno']
    },
    {
        pitanje: 'Koji operator koristimo za strogu jednakost (provjerava i tip i vrijednost)?',
        tocno: '===',
        odgovori: ['=', '==', '===','prazno']
    },
    {
        pitanje: 'Što će ispisati console.log(5 + \'5\')?',
        tocno: '55',
        odgovori: ['10', '55', 'Error','prazno']
    },
    {
        pitanje: 'Kako ispravno pišemo \'if\' izjavu?',
        tocno: 'if (x == 5)',
        odgovori: ['if x = 5 then', 'if (x == 5)', 'if [x == 5]','prazno']
    },
    {
        pitanje: 'Kako se zove petlja koja se izvodi sve dok se ne zadovolji uvjet?',
        tocno: 'while',
        odgovori: ['while do', 'while', 'do while','prazno']
    },
    {
        pitanje: 'Kako glasi operator za logičko \'I\' (AND)?',
        tocno: '&&',
        odgovori: ['||', '&&', '++','prazno']
    },
    {
        pitanje: 'Što radi naredba \'break\' u petlji?',
        tocno: 'Prekida petlju',
        odgovori: ['Preskače jedan krug', 'Prekida petlju', 'Vraća na početak','prazno']
    },
    {
        pitanje: 'Koji je rezultat operacije 10 % 3 (ostatak dijeljenja)?',
        tocno: '1',
        odgovori: ['0', '1', '3','prazno']
    },
    {
        pitanje: 'Kako se zove \'zadana\' grana u switch naredbi ako nijedan case nije točan?',
        tocno: 'default',
        odgovori: ['else', 'fallback', 'default','prazno']
    },
    {
        pitanje: 'Kako ispravno pozivamo funkciju koja se zove \'izracunaj\' i ne prima niti jedan parametar?',
        tocno: 'izracunaj()',
        odgovori: ['call izracunaj', 'izracunaj()', 'function izracunaj','prazno']
    },
    {
        pitanje: 'Što je rezultat izraza !false?',
        tocno: 'true',
        odgovori: ['true', 'false', 'null','prazno']
    },
    {
        pitanje: 'Koji tip petlje koristimo kad točno znamo broj ponavljanja?',
        tocno: 'for',
        odgovori: ['while', 'for', 'do while','prazno']
    },
    {
        pitanje: 'Koja metoda pretvara podatak u string?',
        tocno: 'toString()',
        odgovori: ['toStr()', 'toString()', 'toUpperCase()','prazno']
    },
    {
        pitanje: 'Koja metoda se koristi za dodavanje elementa na kraj polja?',
        tocno: 'push()',
        odgovori: ['push()', 'pop()', 'shift()','prazno']
    },
    {
        pitanje: 'Što je rezultat izraza [] == ![] u JavaScriptu?',
        tocno: 'true',
        odgovori: ['true', 'false', 'TypeError','prazno']
    },
    {
        pitanje: 'Koji tip podataka predstavlja točno ili netočno?',
        tocno: 'boolean',
        odgovori: ['string', 'boolean', 'number','prazno']
    },
    {
        pitanje: 'Koja sintaksa uzrokuje probleme u radu => (arrow funkcije)?',
        tocno: '.this',
        odgovori: ['.this', '.current', '.self',]
    },
    {
        pitanje: 'Koja metoda u JS pretvara JSON string u JS objekt?',
        tocno: 'JSON.parse()',
        odgovori: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()','prazno']
    } 
    ];
    // čitati https://github.com/denysdovhan/wtfjs
}