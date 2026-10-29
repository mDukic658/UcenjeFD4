import './Raspored.css';

// Izvučeni tekst termina u varijablu
const CLASS_TIME = "19:00 - 21:00";
const DEFENSE_TIME = "OBRANA RADOVA"; // Novi tekst za obranu

// JSON struktura svih datuma s nastavu po mjesecima za 2026. godinu
const rasporedData = {
  "Svibanj 2026.": [21, 26, 28],
  "Lipanj 2026.": [2, 9, 11, 15, 16, 17, 23, 24, 25, 30],
  "Srpanj 2026.": [1, 2, 6, 7, 8, 9, 13, 14, 15, 16, 20, 21, 22, 23, 27, 28, 29, 30],
  "Kolovoz 2026.": [17, 18, 19, 20, 24, 25],
  "Rujan 2026.": [7, 8, 9, 10, 14, 15, 17, 21, 22, 23, 24, 25, 28, 29, 30],
  "Listopad 2026.": [1, 5, 6, 7, 8, 12, 14, 15, 19, 20, 21, 22, 26, 27, 28, 29],
  "Studeni 2026.": [2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 16, 17, 19, 20, 21, 23, 24, 25, 26]
};

// Pomoćna mapa za mapiranje naziva mjeseci u numeričku vrijednost
const monthMap = {
  "Svibanj 2026.": 5,
  "Lipanj 2026.": 6,
  "Srpanj 2026.": 7,
  "Kolovoz 2026.": 8,
  "Rujan 2026.": 9,
  "Listopad 2026.": 10,
  "Studeni 2026.": 11
};

export default function Raspored() {
  // Dohvaćamo današnji datum prilikom učitavanja komponente
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() vraća 0-11
  const currentDay = today.getDate();

  // Funkcija koja provjerava je li proslijeđeni dan, mjesec i godina današnji datum
  const isToday = (dayNum, monthName) => {
    const mNum = monthMap[monthName];
    return currentYear === 2026 && currentMonth === mNum && currentDay === dayNum;
  };

  return (
    <>
      <div className="container">
        <h1>PLAN nastave FD4</h1>

        {/* Svibanj 2026. */}
        <MonthSection 
          monthTitle="Svibanj 2026." 
          emptyStart={4} 
          totalDays={31} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Lipanj 2026. */}
        <MonthSection 
          monthTitle="Lipanj 2026." 
          emptyStart={0} 
          totalDays={30} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Srpanj 2026. */}
        <MonthSection 
          monthTitle="Srpanj 2026." 
          emptyStart={2} 
          totalDays={31} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Kolovoz 2026. */}
        <MonthSection 
          monthTitle="Kolovoz 2026." 
          emptyStart={5} 
          totalDays={31} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Rujan 2026. */}
        <MonthSection 
          monthTitle="Rujan 2026." 
          emptyStart={1} 
          totalDays={30} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Listopad 2026. */}
        <MonthSection 
          monthTitle="Listopad 2026." 
          emptyStart={3} 
          totalDays={31} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />

        {/* Studeni 2026. */}
        <MonthSection 
          monthTitle="Studeni 2026." 
          emptyStart={6} 
          totalDays={30} 
          isToday={isToday}
          classTime={CLASS_TIME}
        />
      </div>
    </>
  );
}

// Pomoćna komponenta za generiranje mjeseca i njegovih ćelija radi urednijeg koda
function MonthSection({ monthTitle, emptyStart, totalDays, isToday, classTime }) {
  const classDays = rasporedData[monthTitle] || [];
  
  // Generiranje ćelija dana
  const days = [];
  for (let i = 1; i <= totalDays; i++) {
    const hasClass = classDays.includes(i);
    const dayOfWeek = (emptyStart + i - 1) % 7;
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Subota (5) ili Nedjelja (6)
    const activeToday = isToday(i, monthTitle);

    // Provjera je li točno 26.11.2026.
    const isDefenseDay = monthTitle === "Studeni 2026." && i === 26;

    // Određivanje stila i teksta ovisno o tome je li obrana radova ili običan termin
    let dynamicStyle = {};
    if (activeToday) {
      dynamicStyle = { backgroundColor: '#ffeeba', border: '2px solid #ffc107' };
    }
    
    // Ako je obrana radova, dajemo joj drugačiju boju pozadine (npr. nježno crvenu/ružičastu ili ljubičastu)
    if (isDefenseDay) {
      dynamicStyle = { 
        backgroundColor: '#ffd1d1', 
        border: '2px solid #ff4d4d',
        ...dynamicStyle // Ako je slučajno i "danas", zadržavamo ili nadjačavamo po potrebi
      };
    }

    let cellClass = "day-cell";
    if (isWeekend) cellClass += " weekend";
    if (hasClass) cellClass += " has-class";
    if (isDefenseDay) cellClass += " defense-class"; // Možete dodati i CSS klasu po želji

    days.push(
      <div key={i} className={cellClass} style={dynamicStyle}>
        <span className="day-number">{i}</span>
        {hasClass && (
          <div className="class-label">
            {isDefenseDay ? DEFENSE_TIME : "Studeni 2026." && i === 21 ? '11:00 - 13:00' : classTime}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="month-section">
      <div className="month-title">{monthTitle}</div>
      <div className="calendar-grid">
        <div className="weekday-header">Pon</div>
        <div className="weekday-header">Uto</div>
        <div className="weekday-header">Sri</div>
        <div className="weekday-header">Čet</div>
        <div className="weekday-header">Pet</div>
        <div className="weekday-header">Sub</div>
        <div className="weekday-header">Ned</div>
        
        {/* Prazna polja na početku mjeseca */}
        {Array.from({ length: emptyStart }).map((_, index) => (
          <div key={`empty-${index}`} className="day-cell empty"></div>
        ))}
        
        {days}
      </div>
    </div>
  );
}