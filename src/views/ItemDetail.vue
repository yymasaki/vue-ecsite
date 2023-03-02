<script setup>
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const item = ref([]);
const route = useRoute();
const selectedQuantity = ref([]);

onMounted(() => {
    axios.get('http://localhost:8080/showDetail/' + route.params.id)
        .then((response) => (item.value = response.data))
        .catch((error) => console.log(error))
});

const sumPrice = computed(() => {
    return selectedQuantity.value * item.value.price + '円'
})

// const answer = computed(() => {
//     return require(`@/assets/img_toy/${item.value.imagePath}`);
// })

</script>

<template>
<body>
    <form @submit.prevent="submitForm">
        <h1>商品詳細</h1>
        <div>
            <p>商品名：{{ item.name }}</p>
            <p>値段：{{ item.price }}</p>
            <p>{{ item.description }}</p>
            <img :src="`/img_toy/${item.imagePath}`" width="200" height="200">
            <!-- <img :src="require(`@/assets/img_toy/${item.imagePath}`)" width="200" height="200"> これだとなぜかエラーになる-->
            <!-- <img :src="answer" alt="a"> これもダメ-->
            <label for="quantity">数量:</label>
            <!-- <label class="quantity" style="color: red" for="inputError">数量を選択してください</label><br> -->
            <span v-if="selectedQuantity > 0">{{ selectedQuantity }}</span>
            <span v-else>数量を選択してください</span><br>
            <select v-model="selectedQuantity">
                <option disabled value="数量を選択してください">数量を選択してください</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
            <p>{{ sumPrice }}</p>
            <button type="submit">カートに入れる</button>
        </div>
    </form>
</body>
</template>