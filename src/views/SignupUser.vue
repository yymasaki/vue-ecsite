<script setup>

</script>

<template>
    <form method="post" th:action="@{/signup}" class="form" th:object="${signupForm}">
        <h1>ユーザー登録画面</h1>
        <div class="signup-item">
            <label>
              名前:<br>
              <input type="text" placeholder="山田 太郎"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              メールアドレス:<br>
              <input type="text" placeholder="abc@def.net"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              郵便番号:<button id="get_address_btn" type="button">住所取得</button><br>
              <input id="zipcode" type="text" placeholder="111-1111"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              住所:<br>
              <input id="address" type="text" placeholder="東京都 新宿区"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              電話番号:<br>
              <input type="text" id="tel" placeholder="080-0000-0000"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              パスワード:<br>
              <input id="password" type="password"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              確認用パスワード:<br>
              <input type="password" id="confirmPassword"><br>
            </label>
        </div>
        <button type="reset" class="btn clear_btn">クリア</button>
        <button type="submit" class="btn">登録</button>
    </form>
</template>