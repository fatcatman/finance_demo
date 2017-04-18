package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.Date;

/**
 * Approval created by tianlei
 */
@Entity
@Table(name = "t_formtemplate", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FormTemplate implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String Name;
	@JsonProperty
	private String Path;
	@JsonProperty
	private Approvalitem ApprovalItem;
	@JsonProperty
	private Date CreateTime;
	@JsonProperty
	private int SearchNum;
	public FormTemplate() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	@JsonIgnore
	public int getID() {
		return this.ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	@JsonIgnore
	@Column(name = "Name")
	public String getName() {
		return this.Name;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	@JsonIgnore
	@Column(name = "Path")
	public String getPath() {
		return this.Path;
	}

	public void setPath(String Path) {
		this.Path = Path;
	}

	@JsonIgnore
	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="Approvalitem", nullable = true)
	public Approvalitem getApprovalItem() {
		return this.ApprovalItem;
	}

	public void setApprovalItem(Approvalitem ApprovalItem) {
		this.ApprovalItem = ApprovalItem;
	}

	@JsonIgnore
	@Column(name = "SearchNum")
	public int getSearchNum() {
		return this.SearchNum;
	}

	public void setSearchNum(int SearchNum) {
		this.SearchNum = SearchNum;
	}


	@JsonIgnore
	@Column(name = "CreateTime")
	public Date getCreateTime() {
		return this.CreateTime;
	}

	public void setCreateTime(Date CreateTime) {
		this.CreateTime = CreateTime;
	}
}
