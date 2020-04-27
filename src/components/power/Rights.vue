<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <template>
        <el-table :data="rightsList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="权限ID"></el-table-column>
          <el-table-column prop="authName" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="访问路径"></el-table-column>
          <el-table-column label="权限等级">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level==='0'">
                    一级
                </el-tag>
                <el-tag v-if="scope.row.level==='1'" type="warning">
                    二级
                </el-tag>
                <el-tag v-if="scope.row.level==='2'" type="danger">
                    三级
                </el-tag>
              </template>
          </el-table-column>
          <el-table-column prop="pid" label="父权限ID"></el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  mounted() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      // console.log(res)
      if (res.meta.status !== 200) { return this.$message.error('获取权限列表失败') }
      this.rightsList = res.data
    }
  }
}
</script>
