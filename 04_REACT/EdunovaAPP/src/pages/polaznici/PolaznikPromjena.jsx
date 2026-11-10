import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import PolaznikService from "../../services/polaznici/PolaznikService";
import { useEffect, useRef, useState } from "react";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export default function PolaznikPromjena() {

    const navigate = useNavigate()

    const params = useParams()

    const [polaznik, setPolaznik] = useState({})

    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);

    async function ucitajPolaznika(){
        await PolaznikService.getBySifra(params.sifra).then((odgovor)=>{
            setPolaznik(odgovor.data)
        })
    }

    useEffect(()=>{
        ucitajPolaznika()
    },[])

    async function promijeni(polaznik) {
        await PolaznikService.promijeni(params.sifra, polaznik).then(() => {
            navigate(RouteNames.POLAZNICI)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)


         let dataUrl=null
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


    return (
        <>
             <h3>Promjena polaznika</h3>
            <Row>
                
                <Col md={6}>



                    <Form onSubmit={obradiSubmit}>
                        <Form.Group controlId="ime">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                                type="text"
                                name="ime"
                                defaultValue={polaznik.ime}
                            />
                        </Form.Group>

                        <Form.Group controlId="prezime">
                            <Form.Label>Prezime</Form.Label>
                            <Form.Control
                                type="text"
                                name="prezime"
                                defaultValue={polaznik.prezime}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={polaznik.email}
                            />
                        </Form.Group>

                        <Form.Group controlId="oib">
                            <Form.Label>OIB</Form.Label>
                            <Form.Control
                                type="text"
                                name="oib"
                                maxLength={11}
                                defaultValue={polaznik.oib}
                            />
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