 function kvizAplikacija() {
            return {
                skupPitanja: kreirajPitanja(),
                trenutnaPitanja: [],
                indeks: 0,
                rezultat: 0,
                kvizZavrsen: false,
                brojPitanja: 5,
                progress: 0,

                // Computed property helper
                get trenutnoPitanje() {
                    return this.trenutnaPitanja[this.indeks] || {};
                },

                pokreniNoviKrug() {
                    // Moderniji način odabira 5 unikatnih pitanja
                    this.trenutnaPitanja = [...this.skupPitanja]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, this.brojPitanja);
                        this.trenutnaPitanja.forEach( o => {
                            o.odgovori.sort(() => 0.5 - Math.random())
                        }),
                    this.indeks = 0;
                    this.rezultat = 0;
                    this.kvizZavrsen = false;
                },

                obradiOdgovor(odgovor) {
                    if (odgovor === this.trenutnoPitanje.tocno) this.rezultat++;
                    
                    if (this.indeks < this.brojPitanja-1) {
                        this.indeks++;
                    } else {
                        this.kvizZavrsen = true;
                    }
                    this.progress = (this.indeks / this.brojPitanja) * 100 ;
                },

                dajOcjenu() {
                    if(this.rezultat===0){
                        return 'Nedovoljan (1). Ponovi osnove!';
                    }else{
                        const postotak = (this.rezultat / this.brojPitanja)*100;
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
            }
        }