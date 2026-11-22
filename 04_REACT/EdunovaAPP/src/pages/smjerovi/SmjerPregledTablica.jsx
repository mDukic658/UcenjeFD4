import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";

export default function SmjerPregledTablica({ smjerovi, navigate, obrisi }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey || sortConfig.direction === null) {
            return <FaSort />;
        }
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

        const sortedSmjerovi = () => {
        if (!smjerovi || sortConfig.direction === null) {
            return smjerovi;
        }

        const sorted = [...smjerovi].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Obrada null/undefined vrijednosti
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            // Sortiranje prema tipu podatka: Date
            if (sortConfig.key === 'datumPokretanja') {
                const dateA = new Date(aValue);
                const dateB = new Date(bValue);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Sortiranje prema tipu podatka: boolean
            if (sortConfig.key === 'aktivan') {
                const valA = aValue ? 1 : 0;
                const valB = bValue ? 1 : 0;
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }

            // Sortiranje prema tipu podatka: string
            if (typeof aValue === 'string') {
                // localeCompare s 'hr' parametrom rješava čšćđž ČŠĆĐŽ
                const result = aValue.localeCompare(bValue, 'hr', { sensitivity: 'accent' });
                return sortConfig.direction === 'asc' ? result : -result;
            }

            // Za brojeve (cijena, trajanje)
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    const getAriaSortValue = (columnKey) => {
        if (sortConfig.key !== columnKey || sortConfig.direction === null) return 'none';
        return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
    };

    return (
        <Table striped bordered hover responsive aria-label="Popis smjerova">
            <thead>
                <tr>
                    <th
                        onClick={() => handleSort('naziv')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={getAriaSortValue('naziv')}
                        scope="col"
                    >
                        Naziv <span aria-hidden="true">{getSortIcon('naziv')}</span>
                    </th>
                    <th
                        onClick={() => handleSort('trajanje')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={getAriaSortValue('trajanje')}
                        scope="col"
                    >
                        Trajanje <span aria-hidden="true">{getSortIcon('trajanje')}</span>
                    </th>
                    <th
                        onClick={() => handleSort('cijena')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={getAriaSortValue('cijena')}
                        scope="col"
                    >
                        Cijena <span aria-hidden="true">{getSortIcon('cijena')}</span>
                    </th>
                    <th
                        onClick={() => handleSort('datumPokretanja')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={getAriaSortValue('datumPokretanja')}
                        scope="col"
                    >
                        Datum pokretanja <span aria-hidden="true">{getSortIcon('datumPokretanja')}</span>
                    </th>
                    <th
                        onClick={() => handleSort('aktivan')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={getAriaSortValue('aktivan')}
                        scope="col"
                    >
                        Aktivan <span aria-hidden="true">{getSortIcon('aktivan')}</span>
                    </th>
                    <th scope="col">Akcija</th>
                </tr>
            </thead>
            <tbody>
                {sortedSmjerovi() && sortedSmjerovi().map((smjer) => (
                    <tr key={smjer.sifra}>
                        <td className="lead">{smjer.naziv}</td>
                        <td className='text-end'>{smjer.trajanje} h</td>
                        <td className='text-end'>
                            <NumericFormat
                                value={smjer.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix=' €'
                                prefix='='
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </td>
                        <td>
                            <FormatDatuma datum={smjer.datumPokretanja} />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <GrValidate
                                size={25}
                                color={smjer.aktivan ? 'green' : 'red'}
                                aria-label={smjer.aktivan ? 'Aktivan' : 'Neaktivan'}
                                role="img"
                            />
                        </td>
                        <td>
                            <Button
                                onClick={() => navigate(`/smjerovi/${smjer.sifra}`)}
                                aria-label={`Uredi smjer ${smjer.naziv}`}
                            >
                                <FaEdit aria-hidden="true" />
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                variant="danger"
                                onClick={() => obrisi(smjer.sifra)}
                                aria-label={`Obriši smjer ${smjer.naziv}`}
                            >
                                <FaTrash aria-hidden="true" />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}