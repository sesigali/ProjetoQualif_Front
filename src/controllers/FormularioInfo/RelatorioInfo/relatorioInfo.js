import React from "react";
import '../style/formStyle.css'
import Navbar from "../../../components/Navbar/navbar/navbar";
import Footer from "../../../components/Footer/footer";


export default function RelatorioInfo() {


    return (
        <div>
            <Navbar />
            <Footer />

            <div className="container">
                <div className="container-form">
                    <button className="print btn-empresaInfo">Imprimir</button>
                </div>

            </div>

        </div>

    )
}