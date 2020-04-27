<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="openAddRoleDialog">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1===0 ? 'bdtop' : '','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[i2===0 ? '' : 'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      type="warning"
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!--
              <pre>{{scope.row}}</pre>
            -->
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              size="mini"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeRoleById(scope.row.id)"
              size="mini"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              @close="setRightDialogClosed"
              size="mini"
            >配置权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 打开配置配置权限对话框 -->
    <el-dialog title="配置角色权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-tree
        :data="rightList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色对话框" :visible.sync="addRoleDialogVisible" width="50%">
      <span>
        <el-form :model="roleForm" :rules="roleFormRules" ref="roleFormRef" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="roleForm.roleDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addRole">添加角色</el-button>
            <el-button type="default" @click="addDialogClosed">重置表单</el-button>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="修改角色对话框" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editRoleForm"
        :rules="editRoleFormRules"
        ref="editRoleFormRef"
        label-width="70px"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkChinese = (rule, value, cb) => {
      const regChinese = /^[\u4e00-\u9fa5]+$/
      if (regChinese.test(value)) {
        return cb()
      }
      cb(new Error('请输入中文'))
    }
    return {
      roleList: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      rightList: [],
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      defKeys: [],
      // 当前即将分配角色的roleid
      roleId: '',
      addRoleDialogVisible: false,
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { validator: checkChinese, trigger: 'blur' }
        ],
        roleDesc: [{ validator: checkChinese, trigger: 'blur' }]
      },
      editDialogVisible: false,
      editRoleForm: {},
      editRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { validator: checkChinese, trigger: 'blur' }
        ],
        roleDesc: [{ validator: checkChinese, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.roleList = res.data
    },
    async removeRightById(role, rightId) {
      // console.log(rid)
      // 弹框确定是否删除
      const confirmResult = await this.$confirm(
        '确认删除该角色的权限吗？',
        '确认删除角色权限',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('用户取消了权限删除操作')
      }

      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) this.$message.error('删除权限失败了')
      // this.getRolesList() 会重新刷新页面
      role.children = res.data
    },
    async showSetRightDialog(role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色权限列表出错')
      }
      this.rightList = res.data
      // 递归获取三级节点的 Id
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有的三级权限的id，并保存到defKeys数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，就是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(element => {
        this.getLeafKeys(element, arr)
      })
    }, // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    async allotRights() {
      const keys = [
        // ...展开运算符，把两个数组合并成一个新数组
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )

      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      // 重新获取权限列表
      this.getRolesList()
      // 隐藏分配权限对话框
      this.setRightDialogVisible = false
    },
    openAddRoleDialog() {
      this.addRoleDialogVisible = true
    },
    addRole() {
      this.$refs.roleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.roleForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.addRoleDialogVisible = false
        this.getRolesList()
      })
    },
    addDialogClosed() {
      this.$refs.roleFormRef.resetFields()
    },
    async removeRoleById(roleid) {
      const confirmResult = await this.$confirm(
        '确认要删除该角色吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除角色')
      }
      const { data: res } = await this.$http.delete(`roles/${roleid}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getRolesList()
    },
    async showEditDialog(roleId) {
      const { data: res } = await this.$http.get(`roles/${roleId}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editRoleForm = res.data
      this.editDialogVisible = true
    },
    editRoleInfo() {
      console.log(this.editRoleForm.roleId)
      this.$refs.editRoleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'roles/' + this.editRoleForm.roleId,
          {
            roleName: this.editRoleForm.roleName,
            roleDesc: this.editRoleForm.roleDesc
          }
        )

        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

        this.editDialogVisible = false
        this.getRolesList()
        return this.$message.success('角色编辑成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>
