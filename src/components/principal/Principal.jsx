import React from 'react'
import GoogleOAuth from '../oauth/GoogleOauth'
import '../../assets/css/IntroPage.css'

export default function IntroPage() {
    return (
        <>
        <main class="flex-shrink-0">
            {/*<!-- Header-->*/}
            <header class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">ExamenWeb</h1>
                                <p class="lead fw-normal text-white-50 mb-4">Examen de Ingenieria Web</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <GoogleOAuth />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*<!-- Features section-->*/}
        </main>
        </>
    )
}