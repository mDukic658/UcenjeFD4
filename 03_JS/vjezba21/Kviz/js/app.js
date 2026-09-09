const { createApp } = Vue;

createApp({
    data() {
        return {
            pitanjaZaKrug: [],
            indeks: 0,
            rezultat: 0,
            pokaziRezultate: false,
            ukupnoPitanja: 5
        }
    },
    computed: {
        // Automatski dohvaća trenutno pitanje na temelju indeksa
        trenutnoPitanje() {
            return this.pitanjaZaKrug[this.indeks] || {};
        },
        // Izračunava širinu progres trake
        progres() {
            return (this.indeks / this.ukupnoPitanja) * 100;
        },
        izracunajPostotak(){
            if(this.rezultat===0){
                return '0 %';
            }else{
                const postotak = (this.rezultat / this.ukupnoPitanja)*100;
                return parseInt(postotak) + ' %';
            }
        },
        // Logika ocjenjivanja prebačena u computed radi čistoće
        izracunajOcjenu() {
            if(this.rezultat===0){
                return 'Nedovoljan (1). Ponovi osnove!';
            }else{
                const postotak = (this.rezultat / this.ukupnoPitanja)*100;
                if(postotak>=80){
                    return 'Odličan (5)! Pravi si ES6 majstor!';
                }
                if(postotak>=60){
                    return 'Vrlo dobar (4)! Skoro savršeno.';
                }
                if(postotak>=40){
                    return 'Dobar (3). Solidno poznavanje.';
                }
                return 'Dovoljan (2). Trebaš još malo učiti.';
            }
        }
    },
    methods: {
        pokreniKrug() {
            // Skraćena verzija miješanja i odabira 5 unikatnih pitanja
            this.pitanjaZaKrug = [...skupPitanja]
                .sort(() => 0.5 - Math.random())
                .slice(0, this.ukupnoPitanja);
            
            this.indeks = 0;
            this.rezultat = 0;
            this.pokaziRezultate = false;
        },
        obradiOdgovor(odabrano) {
            if (odabrano === this.trenutnoPitanje.tocno) {
                this.rezultat++;
            }

            if (this.indeks < this.ukupnoPitanja-1) {
                this.indeks++;
            } else {
                this.pokaziRezultate = true;
            }
        }
    },
    mounted() {
        this.pokreniKrug();
    }
}).mount('#app');