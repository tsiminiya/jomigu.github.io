<template>
    <div>
        <div class="container mt-3">
            <div class="bg-light rounded text-center">
                <h1 class="title pt-3 px-3">Hello There!</h1>
                <p class="greetings pb-3 px-3">Welcome to Jomigu!</p>
            </div>
            <div class="row">
                <div class="col-md-8 mb-2">
                    <img src="~/assets/images/banners/jomigu-6.6.png" class="banner" />
                </div>
                <div class="col-md-4 mb-2">
                    <a href="https://s.lazada.com.ph/s.2l1kU">
                        <img src="~/assets/images/banners/featuring-the-bible-in-52-weeks.png" class="banner-stretched" />
                    </a>
                </div>
            </div>
            <AllProducts />
        </div>
    </div>
</template>

<script>
import featured from '../assets/images/banners/featuring-the-bible-in-52-weeks.png';

export default {
    head: {
        title: 'Jomigu Online Shop',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { property: 'og:url', content: 'https://shop.jomigu.com' },
            { property: 'og:type', content: 'page' },
            { property: 'og:title', content: 'Jomigu Online Shop' },
            { property: 'og:description', content: 'This is Jomigu Online Shop. Visit our site to get updates and to know more about the products we offer.' },
            { property: 'og:image', content: featured },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
}
</script>
