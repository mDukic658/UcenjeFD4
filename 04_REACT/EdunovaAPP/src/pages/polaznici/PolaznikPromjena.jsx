import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import PolaznikService from "../../services/polaznici/PolaznikService";
import { useEffect, useRef, useState } from "react";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ShemaPolaznik } from "../../schemas/ShemaPolaznik";



export default function PolaznikPromjena() {

    const navigate = useNavigate()

    const params = useParams()
    const [polaznik, setPolaznik] = useState({})
    const [errors, setErrors] = useState({});

    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);



    async function ucitajPolaznika() {
        await PolaznikService.getBySifra(params.sifra).then((odgovor) => {
            setPolaznik(odgovor.data)
            setSlikaZaCrop(odgovor.data.slika)
        })
    }

    useEffect(() => {
        ucitajPolaznika()
    }, [])

    async function promijeni(polaznik) {
        await PolaznikService.promijeni(params.sifra, polaznik).then(() => {
            navigate(RouteNames.POLAZNICI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);
        const rezultat = ShemaPolaznik.safeParse(objektPodataka);
        if (!rezultat.success) {
            const noveGreske = {};
            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });
            setErrors(noveGreske);
            return;
        }



        let dataUrl = null
        if (cropperRef.current && cropperRef.current.cropper && cropperRef.current.cropper.cropped) {
            const cropper = cropperRef.current.cropper;
            const selectionData = cropper.getData();
            const actualWidth = selectionData.width;
            const actualHeight = selectionData.height;
            const targetSize = 400;
            const canvasWidth = actualWidth > targetSize ? targetSize : actualWidth;
            const canvasHeight = actualHeight > targetSize ? targetSize : actualHeight;
            const canvas = cropper.getCroppedCanvas({
                width: canvasWidth,
                height: canvasHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            dataUrl = canvas.toDataURL('image/png');
        }

        promijeni({
            oib: podaci.get('oib'),
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            slika: dataUrl
        })
    }

    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    return (
        <>
            <h3>Promjena polaznika</h3>
            <Row>

                <Col md={6}>



                    <Form onSubmit={odradiSubmit}>
                        <Form.Group controlId="ime">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                                type="text"
                                name="ime"
                                defaultValue={polaznik.ime}
                                isInvalid={!!errors.ime}
                                onChange={() => ocistiGresku('ime')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.ime}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="prezime">
                            <Form.Label>Prezime</Form.Label>
                            <Form.Control
                                type="text"
                                name="prezime"
                                defaultValue={polaznik.prezime}
                                isInvalid={!!errors.prezime}
                                onChange={() => ocistiGresku('prezime')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.prezime}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={polaznik.email}
                                isInvalid={!!errors.email}
                                onChange={() => ocistiGresku('email')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="oib">
                            <Form.Label>OIB</Form.Label>
                            <Form.Control
                                type="text"
                                name="oib"
                                maxLength={11}
                                defaultValue={polaznik.oib}
                                isInvalid={!!errors.oib}
                                onChange={() => ocistiGresku('oib')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.oib}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mt-4">
                            <Col>
                                <Link to={RouteNames.POLAZNICI} className="btn btn-danger">
                                    Odustani
                                </Link>
                            </Col>
                            <Col>
                                <Button type="submit" variant="success">
                                    Promjeni polaznika
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
                <Col lg={6}>
                    <input className='mb-3' type='file' onChange={onChangeImage} />
                    <Cropper
                        src={slikaZaCrop}
                        style={{ height: 400, width: '100%' }}
                        initialAspectRatio={1}
                        guides={true}
                        autoCropArea={1}
                        viewMode={1}
                        minCropBoxWidth={400}
                        minCropBoxHeight={400}
                        cropBoxResizable={false}
                        background={false}
                        responsive={true}
                        checkOrientation={false}
                        ref={cropperRef}
                    />
                </Col>
            </Row>
        </>
    )
}