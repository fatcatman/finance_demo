package org.andy.work.entity;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 田雷 on 2016/8/23.
 */
public class GridDataResult<T> implements Serializable {

    public GridDataResult()
    {
        items = new ArrayList<T>();
        timeout=false;
    }
    private List<T> items;
    private int total;
    private int page;
    private int limit;
    private int totalPage;
    /// <summary>
    /// 是否超时
    /// </summary>
    private Boolean timeout;

    public void setTotal(int total){
        this.total =total;
    }
    public int getTotal() {
        return this.total;
    }
    public void setPage(int page){
        this.page =page;
    }
    public int getPage() {
        return this.page;
    }
    public void setLimit(int limit){
        this.limit =limit;
    }
    public int getLimit() {
        return this.limit;
    }
    public void setTotalPage(int totalPage){
        this.totalPage =totalPage;
    }
    public int getTotalPage() {
        return this.totalPage;
    }
    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public void setTimeout(Boolean timeout){
        this.timeout =timeout;
    }
    public Boolean getTimeout() {
        return this.timeout;
    }
}
