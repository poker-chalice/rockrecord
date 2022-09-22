<template>
    <!-- <div class="container">
        isEdit:{{}}
    </div> -->
    <el-form ref="postForm">
        <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
            <el-button v-if="!isEdit" @click.prevent.stop="showGuide">显示帮助</el-button>
            <el-button v-loading="loading" style="margin-left: 10px;" type="success" class="submit-btn" @click="submitForm">
            {{ isEdit ? '编辑电子书' : '新增电子书' }}
            </el-button>
        </sticky>
    </el-form>
</template>
<script >
import Sticky from '@/components/Sticky/index.vue';
    export default { 
        name: 'Detail',
        components: { MDinput, Upload, Sticky, Warning },
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            showGuide(){

            }
        }
    }

</script>
<style lang="scss" scoped>
</style>
