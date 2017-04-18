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
@Table(name = "t_image", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Image implements java.io.Serializable {

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
	private String Des;
	@JsonProperty
	private String Type;

	public Image() {
		
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
	@Column(name = "Des")
	public String getDes() {
		return this.Des;
	}

	public void setDes(String Des) {
		this.Des = Des;
	}

	@JsonIgnore
	@Column(name = "Type")
	public String getType() {
		return this.Type;
	}

	public void setType(String Type) {
		this.Type = Type;
	}

}
