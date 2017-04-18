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
@Table(name = "t_parameter", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Parameter implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String Name;
	@JsonProperty
	private String Type;
	@JsonProperty
	private String Value;
	@JsonProperty
	private Date CreateTime;

	public Parameter() {
		
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
	@Column(name = "Type")
	public String getType() {
		return Type;
	}

	public void setType(String type) {
		Type = type;
	}

	@JsonIgnore
	@Column(name = "Value")
	public String getValue() {
		return Value;
	}

	public void setValue(String value) {
		Value = value;
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
