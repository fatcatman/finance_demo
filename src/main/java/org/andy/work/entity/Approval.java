package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import sun.util.calendar.LocalGregorianCalendar;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Approval created by tianlei
 */
@Entity
@Table(name = "t_approval", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Approval implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String Name;
	@JsonProperty
	private Date CreateTime;
	@JsonProperty
	private String eventid;

	private String orglist;

	public Approval() {
		
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
	@Column(name = "eventid")
	public String getEventid() {
		return this.eventid;
	}

	public void setEventid(String eventid) {
		this.eventid = eventid;
	}

	public String getOrglist() {
		return this.orglist;
	}

	public void setOrglist(String orglist) {
		this.orglist = orglist;
	}
}
