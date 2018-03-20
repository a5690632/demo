<template>
  <div id="custom_form" v-cloak class=" wrapper-content animated fadeInRight">
    <div class="root-content">
      <el-breadcrumb separator="/" style="font-size: 18px; margin-bottom: 25px">
        <i class="el-icon-arrow-left prev" @click="prev" style="float: left ;margin-right: 10px"></i>
        <el-breadcrumb-item>
          <a href="/statsreport/admin.report/lists.html">报表管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="./custom_form_list.html">定制表单管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="!form.id">添加自定义数据</el-breadcrumb-item>
        <el-breadcrumb-item v-else>修改自定义数据</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form.info" :rules="rules" ref="form" label-width="160px" class="form" label-position="top" style="padding-left:16px">
        <el-form-item label="数据报表名称 :" prop="name">
          <el-input v-model="form.info.name"></el-input>
        </el-form-item>

        <el-form-item label="添加数据 :" prop="sqls">
          <el-input v-model="form.info.sqls"></el-input>
          <el-button type="primary" @click="preview">预览数据</el-button>
        </el-form-item>

        <el-form-item label="数据预览 :" v-show="show_tableData" class="itemtable">
          <el-table :data="table.data" style="width: 100%" max-height="350">
            <el-table-column :prop="item" :label="item" v-for="item in table.columns"></el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="" >
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
  #custom_form {
    padding: 16px
  }

  .form {
    margin-top: 30px;
  }

  .form .el-input {
    width: 350px;
  }

  .el-icon-arrow-left:hover {
    color: #20a0ff;
  }

  .prev::before {
    cursor: pointer;
  }

</style>
<script>
  export default {
    name: "custom_form",
    data() {
      return {
        form: {
          id: "", // 自定义表单ID 修改时需要传
          info: {
            name: "", //数据报表名称
            sqls: "" //sql语句
          }
        },
        rules: {
          name: [{
            required: true,
            message: '请输入报表名称',
            trigger: 'blur'
          }],
          sqls: [{
            required: true,
            message: '请输入添加的数据',
            trigger: 'blur'
          }],
        },
        data1:{"err":0,"data":[{"id":1,"catid":71,"title":"《变5》观影会，纯甄又双叒红啦","thumb":"","keywords":"变形金刚5","description":"《变5》观影会，纯甄又双叒红啦","url":"","islink":0,"listorder":0,"status":1,"username":"admin","inputtime":1499078702,"updatetime":1499078827}]},
        table: {
          columns: [], //预览数据表格表头
          data: [], //预览数据内容
        },
        show_tableData: false, //是否显示预览数据
      }

    },
    methods: {
      prev() {
        location.href = "./custom_form_list.html"

      },
      preview() { // 预览数据
            
                  let data = this.data1.data;
                  this.table.columns = [];
                  this.table.data = [];
                  if (data.length > 0) {
                    // 根据第一条数据构建表头
                    for (let c in data[0]) {
                      this.table.columns.push(c);
                    }
                  }
                  this.table.data = data;
                  this.show_tableData = true;
            
        // this.$refs.form.validate((valid) => {
        //   if (valid) {
        //     $ajax.post(INTERFACE.reportcustom.publicAjaxGetSqlData, {
        //         sqls: this.form.info.sqls
        //       })
        //       .then((res) => {
        //         if (res.data.err == 0) {
        //           let data = res.data.data;
        //           this.table.columns = [];
        //           this.table.data = [];
        //           if (data.length > 0) {
        //             // 根据第一条数据构建表头
        //             for (let c in data[0]) {
        //               this.table.columns.push(c);
        //             }
        //           }
        //           this.table.data = data;
        //           this.show_tableData = true;
        //         } else {
        //           this.$message.error(res.data.msg);
        //         }
        //       });
        //   } else {
        //     return false;
        //   }
        // });
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let url = this.form.id ? INTERFACE.reportcustom.edit : INTERFACE.reportcustom.add;
            $ajax.post(url, this.form)
              .then((res) => {
                if (res.data.err == 0) {
                  this.$message.success(res.data.msg);
                  history.back();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>
