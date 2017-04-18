package org.andy.work.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ExtResult<T> implements Serializable {

    public ExtResult()
    {
        success = false;
        obj = new ArrayList<T>();
        timeout=false;
    }
    /// <summary>
    /// 结果是否成功
    /// </summary>
    private Boolean success;
    /// <summary>
    /// 结果信息
    /// </summary>
    private String msg;
    /// <summary>
    /// 是否超时
    /// </summary>
    private Boolean timeout;

    private List<T> obj;

    public void setSuccess(Boolean success){
        this.success =success;
    }
    public Boolean getSuccess() {
        return this.success;
    }
    public void setMsg(String msg){
        this.msg =msg;
    }
    public String getMsg() {
        return this.msg;
    }
    public void setTimeout(Boolean timeout){
        this.timeout =timeout;
    }
    public Boolean getTimeout() {
        return this.timeout;
    }
    public List<T> getObj() {
        return obj;
    }

    public void setObj(List<T> obj) {
        this.obj = obj;
    }
}
