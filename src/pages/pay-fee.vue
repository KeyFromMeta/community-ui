<template>
<div>
    <h1>pay fees</h1>
    <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-form ref="form" :model="sizeForm" label-width="300px" size="medium" :label-position="right">
        <el-row>
            <el-col :span="12">
                <el-form-item label="2013年末缴费金额合计：">
                    <el-input v-model="oldTotalAmount"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="2014年1月1日以后税后缴费金额合计：">
                    <el-input v-model="newTotalAmount"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="待遇支付时本金：">
                    <el-input v-model="principal"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="待遇支付时资产净值：">
                    <el-input  v-model="netAssetValue"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-tabs type="border-card">
            <el-tab-pane label="一次性支付">
                <el-radio v-model="radio" label="month">退休按月分期领取</el-radio>
                <el-radio v-model="radio" label="quarter">退休按季分期领取</el-radio>
                <el-radio v-model="radio" label="year">退休按年分期领取</el-radio>
            </el-tab-pane>
            <el-tab-pane label="退休按月分期领取">
                <!--放到组件中-->
                <el-table :data="tableData">
                    <el-table-column type="radio" width="50" align="center" />
                    <el-table-column 
                        prop="type"
                        label="支付类型">
                    </el-table-column>
                    <el-table-column
                        prop="periods"
                        label="支付月度">
                    </el-table-column>
                    <el-table-column
                        prop="amoutOfPeriod"
                        label="每期支付金额">
                    </el-table-column>
                    <el-table-column
                        prop="TaxRatio"
                        label="应纳税比例">
                    </el-table-column>
                    <el-table-column
                        prop="TaxAmount"
                        label="应纳税所得额">
                    </el-table-column>
                    <el-table-column
                        prop="lastPeroidTaxAmount"
                        label="末月应纳税所得额">
                    </el-table-column>
                    <el-table-column
                        prop="lastPeroidAmount"
                        label="末月领取金额"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="lastPeroidTax"
                        label="末月纳税金额"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="totalTaxAmount"
                        label="合计纳税金额">
                    </el-table-column>
                </el-table>
                <el-radio v-model="radio" label="month">退休按月分期领取</el-radio>
                <el-radio v-model="radio" label="quarter">退休按季分期领取</el-radio>
                <el-radio v-model="radio" label="year">退休按年分期领取</el-radio>
            </el-tab-pane>
            <el-tab-pane label="退休按季分期领取">角色管理</el-tab-pane>
            <el-tab-pane label="退休按年分期领取">定时任务补偿</el-tab-pane>
        </el-tabs>
        
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

    </el-form>
</div>
</template>
<script>
  export default {
    data () {
      return {
        radio: 'month',
        oldTotalAmount:0,
        newTotalAmount:0,
        principal:0,
        netAssetValue:0,
      }
    },
    computed:{
        
    }
  }
</script>