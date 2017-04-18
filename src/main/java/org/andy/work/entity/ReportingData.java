package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.Date;

/**
 * Approval created by hexiao
 */
@Entity
@Table(name = "t_reporting_data", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReportingData implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String reportingMonth;
	@JsonProperty
	private String fundsBase ;
	@JsonProperty
	private String servicePayment;
	@JsonProperty
	private Employee employee;
	@JsonProperty
	private String isHandled;
	@JsonProperty
	private String reportingResult;
	@JsonProperty
	private String reportingResultDetail;
	@JsonProperty
	private Date createTime;

	public ReportingData() {
		
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
	@Column(name = "reporting_month")
	public String getReportingMonth() {
		return reportingMonth;
	}

	public void setReportingMonth(String reportingMonth) {
		this.reportingMonth = reportingMonth;
	}

	@JsonIgnore
	@Column(name = "funds_base")
	public String getFundsBase() {
		return fundsBase;
	}

	public void setFundsBase(String fundsBase) {
		this.fundsBase = fundsBase;
	}

	@JsonIgnore
	@Column(name = "service_payment")
	public String getServicePayment() {
		return servicePayment;
	}

	public void setServicePayment(String servicePayment) {
		this.servicePayment = servicePayment;
	}


	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="employee_id", nullable = true)
	@JsonIgnore
	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	
	@JsonIgnore
	@Column(name = "is_handled")
	public String getIsHandled() {
		return isHandled;
	}

	public void setIsHandled(String isHandled) {
		this.isHandled = isHandled;
	}

	@JsonIgnore
	@Column(name = "reporting_result")
	public String getReportingResult() {
		return reportingResult;
	}

	public void setReportingResult(String reportingResult) {
		this.reportingResult = reportingResult;
	}
	
	@JsonIgnore
	@Column(name = "reporting_result_detail")
	public String getReportingResultDetail() {
		return reportingResultDetail;
	}

	public void setReportingResultDetail(String reportingResultDetail) {
		this.reportingResultDetail = reportingResultDetail;
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
