<template>
    <footer>
        <div class="container-fluid p-4 mt-4 bg-jomigu-2 text-blue">
            <p class="text-center">Follow us at</p>
            <ul class="shops">
                <li v-for="shop in shops" :key="shop.id">
                    <p>
                        <a :href="shop.url">
                            <img :src="require(`~/assets/images/shops/${shop.image}`)" />
                        </a>
                    </p>
                </li>
            </ul>
            <ul class="sites">
                <li v-for="site in sites" :key="site.id">
                    <p>
                        <a :href="site.url">
                            <i :class="`bi-${site.icon}`"></i>
                            <span>{{ site.name }}</span>
                        </a>
                    </p>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            shops: [],
            sites: [],
        }
    },

    async fetch() {
        this.shops = await this.$content('shops').fetch();
        this.sites = await this.$content('social-media').fetch();
    }
}
</script>
