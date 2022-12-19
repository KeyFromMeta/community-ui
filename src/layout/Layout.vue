<template>
    <div>
        <el-container>
            <el-header>
                <Navbar></Navbar>
            </el-header>
            <el-main>
                <Content></Content>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Content from './components/Content.vue'
import Navbar from './components/Navbar.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Layout',
    components:{
        Navbar,
        Content,
    }   
}
</script>
