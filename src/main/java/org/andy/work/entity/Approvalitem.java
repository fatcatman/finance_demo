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
@Table(name = "t_approvalitem", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Approvalitem implements java.io.Serializable {

	/**temp/1/国税01事项/1/国税001机构/1
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String Name;
	@JsonProperty
	private Date CreateTime;


	@JsonProperty
	private Approval Approval;
	@JsonProperty
	private String Type;

	public Approvalitem() {
		
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
	@Column(name = "CreateTime")
	public Date getCreateTime() {
		return this.CreateTime;
	}

	public void setCreateTime(Date CreateTime) {
		this.CreateTime = CreateTime;
	}

	@JsonIgnore
	@Column(name = "Type")
	public String getType() {
		return this.Type;
	}

	public void setType(String Type) {
		this.Type = Type;
	}



	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="Approval", nullable = true)
	@JsonIgnore
	public Approval getApproval() {
		return this.Approval;
	}

	public void setApproval(Approval Approval) {
		this.Approval = Approval;
	}
	@JsonProperty
	public String eventCode;

	public String getEventCode() {
		return eventCode;
	}

	public void setEventCode(String eventCode) {
		this.eventCode = eventCode;
	}
}
