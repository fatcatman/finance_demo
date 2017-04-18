package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Approval created by hexiao
 */
@Entity
@Table(name = "t_employee", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Employee implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String name;
	@JsonProperty
	private String idNumber ;
	@JsonProperty
	private String companyName;
	@JsonProperty
	private String businessType;
	private Set<ReportingData> reportingDatas = new HashSet<ReportingData>(0);
	@JsonProperty
	private Date createTime;
	
	public Employee() {
		
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
	@Column(name = "name", unique = false, nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	@Column(name = "id_number", unique = true, nullable = false)
	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	@JsonIgnore
	@Column(name = "company_name")
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@JsonIgnore
	@Column(name = "business_type")
	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	@JsonIgnore
	@OneToMany
	public Set<ReportingData> getReportingDatas() {
		return reportingDatas;
	}

	public void setReportingDatas(Set<ReportingData> reportingDatas) {
		this.reportingDatas = reportingDatas;
	}

	@JsonIgnore
	@Column(name = "create_time")
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
